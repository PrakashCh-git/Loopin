import { BadgeCheck, Heart, MessageCircle, Share2 } from "lucide-react";
import React, { useState } from "react";
import moment from "moment";
import { dummyUserData } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const PostCard = ({ posts }) => {
  const postWithHashtags = posts.content.replace(
    /(#\w+)/g,
    '<span class="text-indigo-600 font-semibold">$1</span>',
  );


  const [likes,setLikes] = useState(posts.likes_count)
  const currentUser = dummyUserData

  function handleLike() {

  }
  const navigate = useNavigate()
  return (
    // User Information
    <div className="bg-white rounded-xl shadow p-4 space-y-4 w-full max-w-2xl">
      <div onClick={()=>navigate('/profile/' + posts.user._id)} className="inline-flex items-center gap-3 cursor-pointer">
        <img
          src={posts.user.profile_picture}
          alt=""
          className="w-10 h-10 rounded-full shadow"
        />
        <div>
          <div className="flex items-center space-x-1">
            <span>{posts.user.full_name}</span>
            <BadgeCheck className="w-4 h-4 text-blue-500" />
          </div>
          <div>
            @{posts.user.username} . {moment(posts.createdAt).fromNow()}
          </div>
        </div>
      </div>

      {/* Content */}
      {posts.content && (
        <div
          className="text-gray-800 text-sm whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: postWithHashtags }}
        />
      )}

      {/* image */}
      <div className="grid grid-cols-2 gap-2">
        {posts.image_urls.map((img, index) => (
          <img
            key={index}
            src={img}
            alt=""
            className={`w-full h-48 object-cover rounded-lg ${posts.image_urls.length === 1 && "col-span-2 h-auto"}`}
          />
        ))}
      </div>

      {/* actions */}
      <div className="flex items-center gap-4 text-gray-600 text-sm pt-2 border-t border-gray-300">
        <div className="flex items-center gap-1">
            <Heart className={`w-4 h-4 cursor-pointer ${likes.includes(currentUser._id) && 'text-red-500 fill-red-500'}`} onClick={handleLike}/>
            <span>{likes.length}</span>
        </div>
        <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4"/>
            <span>{12}</span>
        </div>
        <div className="flex items-center gap-1">
            <Share2 className="w-4 h-4"/>
            <span>{7}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
