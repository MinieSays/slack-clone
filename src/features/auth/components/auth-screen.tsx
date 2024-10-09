"use client";

import { useState } from "react";
import { SignInFlow } from "./types";
import { SignInCard } from "./sign-in-card";
import { SignUpCard } from "./sign-up-card";

export const AuthScreen = () => {
  const [state, setState] = useState<SignInFlow>("signIn");

  return (
    <div className="h-full flex items-center justify-center bg-[#5C3B58]">
      <div className="flex flex-col md:flex-row items-center justify-center space-x-6">
        <div className="md:h-auto md:w-[350px] rounded-2xl mb-6">
          <div className="bg-white mb-10 text-center">
            <h3 className="text-2xl font-semibold">Login for Demo Use</h3>
            <h3 className="text-xl">
              <strong>Email:</strong> miniejobs@gmail.com
            </h3>
            <h3 className="text-xl">
              <strong>Password:</strong> Purple123$$
            </h3>
          </div>
          {state === "signIn" ? <SignInCard setState={setState} /> : <SignUpCard setState={setState} />}
        </div>

        <div className="md:w-[700px] rounded-2xl">
          <iframe
            width="100%"
            height="500"
            src="https://www.loom.com/embed/53b0dc6193c1442788b6de4f54821a88?sid=4eaa8e95-e6ea-4d2a-810f-e37993f1d2d7"
            title="Demo Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};
