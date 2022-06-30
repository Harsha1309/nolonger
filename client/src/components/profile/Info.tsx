import React from "react";
import Following from "./UserFollowing";
import UserBlogs from "./UserBlogs";
import UserDrafts from "./UserDrafts";
import Follower from "./UserFollower";

const Info: React.FC = () => {
    return (
        <>
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Blogs</button>
                    <button className="nav-link" id="nav-drafts-tab" data-bs-toggle="tab" data-bs-target="#nav-drafts" type="button" role="tab" aria-controls="nav-drafts " aria-selected="false">Drafts</button>
                    <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Followers</button>
                    <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Following</button>
                </div>
            </nav>
            <div className="tab-content my-3" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex={0}><UserBlogs /></div>
                <div className="tab-pane fade" id="nav-drafts" role="tabpanel" aria-labelledby="nav-drafts-tab" tabIndex={0}><UserDrafts /></div>
                <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex={0}><Follower /></div>
                <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab" tabIndex={0}><Following /></div>
            </div>

        </>
    );
};

export default Info;
