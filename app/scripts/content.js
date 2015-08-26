'use strict';

/* Inform the background page that 
 * this tab should have a page-action */
chrome.runtime.sendMessage({
    from:    'content',
    subject: 'showPageAction'
});

/* Listen for message from the popup */
chrome.runtime.onMessage.addListener(function(msg, sender, response) {
    /* First, validate the message's structure */
    if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {

        var title = document.querySelector('.miniplayer-info .miniplayer-info-track-title a');
        var artist = document.querySelector('.miniplayer-info .miniplayer-info-artist-name a');
        response({
            title: title && title.getAttribute('title'),
            artist: artist && artist.getAttribute('title')
        });
    }
});