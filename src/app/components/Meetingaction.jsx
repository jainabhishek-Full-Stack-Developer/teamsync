"use client";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Copy, Link2, LinkIcon, Plus, Video } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { generateCustomUUID } from "../utils";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';



const Meetingaction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [baseUrl, setBaseUrl] = useState('');
  const router = useRouter();
  const [genratedMettingUrl, setGenratedMeetingUrl] = useState();
  const [meetingLink, setMeetingLink] = useState('');

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);





  const meetingLater = () => {
    const roomId = generateCustomUUID();
    const url = `${roomId}`;
    setGenratedMeetingUrl(url);
    setIsDialogOpen(true);
    toast.success("meeting link created successfully!");

  }

  const handleJoinMeeting = () => {
    if (meetingLink) {
      setIsLoading(true);
      const formatLink = meetingLink.includes('http') ? meetingLink : `${baseUrl}/video-meeting/${meetingLink}`;
      router.push(formatLink);
      toast.info('joining meeting...');
    }
    else {
      toast.error('please enter valid link')
    }
  }


  const handleStartMeeting = () => {
    setIsLoading(true);
    const roomId = generateCustomUUID();
    const meetingUrl = `${baseUrl}/video-meeting/${roomId}`;
    router.push(meetingUrl);
    toast.info('joining meeting...');

  }
  const copyToClipboard = () => {
    navigator.clipboard.writeText(genratedMettingUrl);
    toast.info('link copied');
  }
  return (
    <>
      <div className="flex flex-col mt-6 sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        {/* New Meeting Button with Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-full sm:w-auto px-6 py-3 text-base font-medium flex items-center gap-2 shadow-md transition-all hover:shadow-lg">
              <Video className="w-5 h-5" />
              New Meeting
            </Button>

          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-70 mt-2 shadow-lg border rounded-md bg-white dark:bg-gray-800">
            {/* <DropdownMenuItem onClick={meetingLater} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition">
              <Link2 className="w-4 h-4" />
              Create a meeting for later
            </DropdownMenuItem> */}
            <DropdownMenuItem onClick={handleStartMeeting} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition">
              <Plus className="w-4 h-4" />
              Start an Instant Meeting
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Join Meeting Input */}
        <div className="flex w-full sm:w-auto relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <LinkIcon className="w-5 h-5" />
          </span>
          <Input
            placeholder="Enter a code or link"
            className="pl-10 pr-4 py-3 w-full sm:w-64 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white transition"
            value={meetingLink}
            onChange={(e) => setMeetingLink(e.target.value)}
          />
          <Button varient="secondary" className="rounded-l-none" onClick={handleJoinMeeting}>Join</Button>
        </div>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-sm rounded-lg p-6">
          <DialogHeader>
            <DialogTitle>Here's your joining information</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">Share this with those you'd like to meet. Save it for future use to stay organized and efficient.</p>
            <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-600 p-4 rounded-lg">
              <span className="text-gray-700 dark:text-gray-200 break-all">
                {genratedMettingUrl ? `${genratedMettingUrl.slice(0, 30)}...` : "Generating link..."}
              </span>
              <Button varient="ghost" className="hover:bg-gray-200" onClick={copyToClipboard}>
                <Copy className="w-5 h-5 text-white-500" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>

  )
}

export default Meetingaction;
