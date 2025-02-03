"use client";

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState, useRef } from 'react';
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { toast } from 'react-toastify';


const Videomeeting = () => {
  const params = useParams();
  const roomId = params.roomId;
  const username = localStorage.getItem('username');
  const email = localStorage.getItem('email');

  const router = useRouter();
  const containerRef = useRef(null);
  const [zp, setZp] = useState(null);
  const [isInMeeting, setIsInMeeting] = useState(false);

  useEffect(() => {
    if (username !== '' && username && containerRef.current) {
      joinMeeting(containerRef.current);
    } else {
      console.log('user is unauthenticated');
    }
  }, [username, email]);



  const joinMeeting = async (element) => {
    const appID = Number(process.env.NEXT_PUBLIC_ZEGOAPP_ID);
    const serverSecret = process.env.NEXT_PUBLIC_ZEGO_SERVER_SECRET;
    if (!appID || !serverSecret) {
      toast.error("App ID or Server Secret is missing!");
      return;
    }

    try {
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId, username || Date.now().toString(), username || 'Guest');
      const zegoInstance = ZegoUIKitPrebuilt.create(kitToken);

      setZp(zegoInstance);

      zegoInstance.joinRoom({
        container: element,
        sharedLinks: [
          {
            name: 'join via this link',
            url: `${roomId}`
          },
        ],
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall,
        },
        showAudioVideoSettingsButton: true,
        showScreenSharingButton: true,
        showTurnOffRemoteCameraButton: true,
        showTurnOffRemoteMicrophoneButton: true,
        showRemoveUserButton: true,
        onJoinRoom: () => {
          toast.success('Meeting joined successfully!');
          setIsInMeeting(true);
        },
        onLeaveRoom: () => {
          endMeeting();
        }
      });
    } catch (error) {
      toast.error('Error joining the meeting!');
      console.error(error);
    }
  };

  const endMeeting = () => {
    if (zp) {
      zp.destroy();
    }
    toast.success('Meeting ended successfully!');
    setZp(null);
    setIsInMeeting(false);
    router.push('/homecontent');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className={`flex-grow flex flex-col md:flex-row relative ${isInMeeting ? 'h-screen' : ''}`}>
        <div
          ref={containerRef}
          className="video-container flex-grow bg-white dark:bg-black"
          style={{ height: isInMeeting ? "100%" : "calc(100vh - 4rem)" }}
        ></div>
      </div>
    </div>
  );
};

export default Videomeeting;
