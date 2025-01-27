import { tweetsData } from "./data.js";


const tweetBtn = document.getElementById("tweet-btn")
const tweetInput = document.getElementById("tweet-input")
tweetBtn.addEventListener("click", function() {

    console.log(tweetInput.value)
    tweetInput.value = ""
    getFeedHTMl()
})

document.addEventListener("click" , function(e){
   if(e.target.dataset.likes){
     handleLikeClick(e.target.dataset.likes)
   }
   
})

function handleLikeClick(tweetID) {
   
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetID;
    })[0]
    targetTweetObj.likes++
    console.log(targetTweetObj)
}
function getFeedHTMl() {
    let feedHTML  = ""
      tweetsData.forEach(function(tweet){
       feedHTML += `<div class="tweet">
    <div class="tweet-inner">
        <img src=${tweet.profilePic} class="profile-pic">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                   <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i> ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                  <i class="fa-solid fa-heart" data-likes="${tweet.uuid}"></i>  ${tweet.likes}
                </span>
                <span class="tweet-detail">
                  <i class="fa-solid fa-retweet" data-retweet="${tweet.uuid}"></i> ${tweet.retweets}
                </span>
            </div>   
        </div>            
    </div>
</div>`
       
    })
    return feedHTML;
}

function render() {
    document.getElementById("feed").innerHTML = getFeedHTMl()
}
render()