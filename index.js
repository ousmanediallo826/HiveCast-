import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';



// tweetBtn.addEventListener("click", function() {
// 
    // console.log(tweetInput.value)
    // tweetInput.value = ""
    // getFeedHTMl()
// })

document.addEventListener("click" , function(e){
   if(e.target.dataset.likes){
     handleLikeClick(e.target.dataset.likes)
   }
   else if(e.target.dataset.retweet){
    handleRetweetClick(e.target.dataset.retweet)
   }
   else if(e.target.dataset.reply){
    handleReplyClick(e.target.dataset.reply)
   }
   else if(e.target.id === 'tweet-btn'){
    handleTweetBtnClick()
}
})

function handleLikeClick(tweetID) {
   
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetID;
    })[0]
    if(targetTweetObj.isLiked){
        targetTweetObj.likes--;
        
    } else {
        targetTweetObj.likes++;
        
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked;
   
    render()
    
}

function handleRetweetClick(tweetID) {
    const targetRetweetObj  =  tweetsData.filter(function(tweet){
        return tweet.uuid === tweetID;
    })[0]
    if(targetRetweetObj.isRetweeted){
        targetRetweetObj.retweets--;
    } else {
        targetRetweetObj.retweets++;
    }
    targetRetweetObj.isRetweeted = !targetRetweetObj.isRetweeted;
    render()
    console.log(targetRetweetObj)

}

function handleReplyClick(replyID){
    document.getElementById(`replies-${replyID}`).classList.toggle('hidden')
    

}
function handleTweetBtnClick(){
    const tweetInput = document.getElementById("tweet-input")
    if(tweetInput.value){
    tweetsData.unshift({
        handle: `@Scrimba`,
        profilePic: `images/scrimbalogo.png`,
        likes: 0,
        retweets: 0,
        tweetText: tweetInput.value,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: uuidv4()
    })
    render()
}
    
    tweetInput.value = ''
}
function getFeedHTMl() {
    let feedHTML  = ""
      tweetsData.forEach(function(tweet){
        let likeIconClass = ''
        let shareIconClass = ''
        if(tweet.isLiked){
            likeIconClass = 'liked'
        }
        if(tweet.isRetweeted){
            shareIconClass = 'retweeted'
        }
         let repliesHtml = ''
        if(tweet.replies.length > 0) {
          tweet.replies.forEach(function(reply){
            repliesHtml += ` <div class="tweet-reply">
            <div class="tweet-inner">
               <img src="${reply.profilePic}" class="profile-pic">
           <div>
               <p class="handle">${reply.handle}</p>
               <p class="tweet-text">${reply.tweetText}</p>
           </div>
       </div>
       </div>`
          })
            console.log(tweet.uuid)
           
        }
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
                  <i class="fa-solid fa-heart ${likeIconClass}" data-likes="${tweet.uuid}"></i>  ${tweet.likes}
                </span>
                <span class="tweet-detail">
                  <i class="fa-solid fa-retweet ${shareIconClass}" data-retweet="${tweet.uuid}"></i> ${tweet.retweets}
                </span>
            </div>   
        </div>            
    </div>
</div>
<div id="replies-${tweet.uuid}">
       ${repliesHtml}
    </div>   
</div>`
       
    })
    return feedHTML;
}

function render() {
    document.getElementById("feed").innerHTML = getFeedHTMl()
}
render()