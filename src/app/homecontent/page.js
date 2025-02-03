"use client";
import Header from "../components/Header";
import Meetingaction from "../components/Meetingaction";
import Meetingfeature from "../components/Meetingfeature";


export default function Homecontent() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main className="flex-grow p-8 pt-32">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6 text-gray-900 dark:text-white font-[Poppins]">
                Sync. Collaborate. Succeed.
              </h1>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed w-1/2">
                Effortless meetings, seamless connectivity—anytime, anywhere.
              </p>
              <Meetingaction />
            </div>
            <div className="md:w-1/2">
              <Meetingfeature />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
