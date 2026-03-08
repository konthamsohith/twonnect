"use client";

import React, { useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

/**
 * High-fidelity VideoCallUI integration for Teams-style interface.
 * Hardened against Next.js re-renders and Zego internal telemetry race conditions.
 */
export default function VideoCallUI({
    roomID,
    userID,
    userName,
    mode = "GroupCall", // 'OneONoneCall' or 'GroupCall'
    initialMode = "video", // 'video' or 'audio'
}: {
    roomID: string;
    userID: string;
    userName: string;
    mode?: "OneONoneCall" | "GroupCall";
    initialMode?: "video" | "audio";
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const zpRef = useRef<any>(null);

    useEffect(() => {
        let active = true;

        const initSession = async () => {
            // Small initial tick delay to escape React's double-mount/commit cycle in dev
            await new Promise(resolve => setTimeout(resolve, 50));

            if (!containerRef.current || !active) return;

            try {
                const appID = Number(process.env.NEXT_PUBLIC_ZEGO_APP_ID);
                const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET || "f4756ef508c33ea959b127f24f9787bd";

                if (!appID) {
                    console.error("[Zego] No App ID configured");
                    return;
                }

                const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
                    appID, serverSecret, roomID, userID, userName
                );

                if (!active) return;

                const zp = ZegoUIKitPrebuilt.create(kitToken);
                zpRef.current = zp;

                if (!active) {
                    zp.destroy();
                    zpRef.current = null;
                    return;
                }

                zp.joinRoom({
                    container: containerRef.current,
                    sharedLinks: [{
                        name: 'Internal Link',
                        url: window.location.origin + window.location.pathname + '?roomID=' + roomID,
                    }],
                    scenario: {
                        mode: mode === "OneONoneCall" ? ZegoUIKitPrebuilt.OneONoneCall : ZegoUIKitPrebuilt.GroupCall,
                    },
                    showScreenSharingButton: true,
                    showPreJoinView: false,
                    turnOnMicrophoneWhenJoining: true,
                    turnOnCameraWhenJoining: initialMode === "video",
                    showTextChat: false,
                    showUserList: false,
                    maxUsers: 2,
                    layout: "Auto",
                    showLayoutButton: false,
                });
            } catch (err) {
                console.warn("[Zego] Initialization warning:", err);
            }
        };

        initSession();

        return () => {
            active = false;
            // Immediate destruction can sometimes trigger 'createSpan' null errors 
            // if the internal telemetry hasn't finished its setup tick.
            const instance = zpRef.current;
            if (instance) {
                try {
                    instance.destroy();
                } catch (e) {
                    console.warn("[Zego] Cleanup suppressed:", e);
                }
                zpRef.current = null;
            }
        };
    }, [roomID, userID, userName, mode, initialMode]);

    return (
        <div
            ref={containerRef}
            className="video-ui-container"
            style={{ width: "100%", height: "100%", borderRadius: '12px', overflow: 'hidden' }}
        />
    );
}
