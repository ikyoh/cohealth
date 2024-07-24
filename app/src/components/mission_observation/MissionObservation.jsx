import dayjs from "dayjs";
import React from "react";
import { URL } from "../../config/api.config";

const MissionObservation = ({ observation }) => {
    return (
        <div className="flex gap-2 py-2">
            {observation.user.avatar ? (
                <div className="bg-white flex gap-3 rounded-full">
                    <img
                        src={URL + observation.user.avatar.contentUrl}
                        className="rounded-full object-cover h-8 w-8"
                        alt="profil"
                    />
                </div>
            ) : (
                <div className="rounded-full flex items-center justify-center h-8 w-8 bg-slate-300">
                    {observation.user.firstname &&
                        observation.user.firstname.charAt(0)}
                    {observation.user.lastname &&
                        observation.user.lastname.charAt(0)}
                    {observation.user.organization &&
                        observation.user.organization.charAt(0).toUpperCase()}
                </div>
            )}
            <div className="flex-1">
                <div className="subcard-title">
                    {dayjs(observation.createdAt).format("DD/MM/YYYY - HH:mm")}
                </div>
                <p className="whitespace-pre-line">{observation.content}</p>
            </div>
        </div>
    );
};

export default MissionObservation;
