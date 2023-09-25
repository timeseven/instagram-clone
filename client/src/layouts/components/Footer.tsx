import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="w-full m-auto pt-32 pb-8 px-4 overflow-visible">
      <div className="flex flex-col justify-center items-center flex-wrap mt-0 font-normal text-xs ">
        <nav className="flex flex-col justify-start flex-wrap ">
          <ul className="flex justify-center items-stretch flex-wrap ">
            <li className="mr-[1.6rem] text-neutral-500">
              <Link to="https://about.meta.com/">Meta</Link>
            </li>
            <li className="mr-[1.6rem] text-neutral-500">
              <Link to="https://about.instagram.com/">About</Link>
            </li>
            <li className="mr-[1.6rem] text-neutral-500">
              <Link to="https://about.instagram.com/en_US/blog">Blog</Link>
            </li>
            <li className="mr-[1.6rem] text-neutral-500">
              <Link to="https://about.instagram.com/about-us/careers">Jobs</Link>
            </li>
            <li className="mr-[1.6rem] text-neutral-500">
              <Link to="https://help.instagram.com/">Help</Link>
            </li>
            <li className="mr-[1.6rem] text-neutral-500">
              <Link to="https://developers.facebook.com/docs/instagram">API</Link>
            </li>
            <li className="mr-[1.6rem] text-neutral-500">
              <Link to="https://privacycenter.instagram.com/policy/?entry_point=ig_help_center_data_policy_redirect">
                Privacy
              </Link>
            </li>
            <li className="mr-[1.6rem] text-neutral-500">
              <Link to="https://help.instagram.com/581066165581870/">Terms</Link>
            </li>
            <li className="mr-2 text-neutral-500">
              <Link to="https://www.instagram.com/explore/locations/">Locations</Link>
            </li>
            <li className="mr-[1.6rem] text-neutral-500">
              <Link to="https://www.instagram.com/web/lite/">Instagram Lite</Link>
            </li>
            <li className="mr-[1.6rem] text-neutral-500">
              <Link to="https://www.threads.net/login">Threads</Link>
            </li>
            <li className="mr-[1.6rem] text-neutral-500">
              <Link to="https://www.facebook.com/help/instagram/261704639352628">Contact Uploading & Non-Users</Link>
            </li>
            <li className="mr-[1.6rem] text-neutral-500">
              <Link to="https://about.meta.com/technologies/meta-verified/">Meta Verified</Link>
            </li>
          </ul>
        </nav>
        <div className="mt-3 text-neutral-500">
          © 2023 Instagram Clone from
          <Link to="/">&nbsp;</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
