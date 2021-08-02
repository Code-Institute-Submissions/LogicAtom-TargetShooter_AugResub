Target Shooter

This is a JavaScript game where the player commands a Space Shooter Ship that the player moves around the screen and shoots at moving targets. The targets break apart into incrementally smaller sized targets. A point system is awarded and a high score is saved across browser sessions.

After all target objects are destroyed, the next level loads with increasing difficulty and more faster targets. The object of the game is purely entertainment related.

The game levels just keep going up, there is no winning the game for a prize or reward..its merely for fun only!

Keep playing to try to beat your high score!
 
## UX
 
I designed the game to be a fun and easy to play game for all age groups, both females and males. It was designed for desktop computer and laptop pc systems that have physical keyboards. The game is most likely to draw more of a male interest for those who enjoy vintage style gaming on older systems. The way this game operates is easy to understand and anyone can become a skilled Hunter in a very short period of time. My project uses simple controls that are intutitive and effective which makes it one of the best shooter games out there. 

I really wanted to create an accessiblity user experience. Which is the primary reason that I used the keyboard arrow keys for controls. And the down arrow to shoot. This ensure one-handed operation of all controls in the game.

### User Stories/Extended Scenarios
    An average adult male named Tony, is looking for a game to play to de-stress while waiting for a virtual job interviewer to meet with him. Tony finds this internet game and tries it out. The simple control structure and enjoyability create the perfect environment and while playing he forgets about the cares of the outside world while he blasts away targets. The interviewer meets with Tony and sees that he is much calmer and confident to openly talk and share about his work experience. Tony gets the job and smiles, and bookmarks my game and shares his experience with friends who then become avid enthusiasts.

    Peggy, a middle aged female, public High School Mathematics Teacher is looking for new ways to get her students to enjoy Math. She does an internet search for a web application game that uses core trigonometry and discrete math by using JavaScript. My project game sounds interesting to her so she tries it and really likes it. She asks the programmer (me) for the code to share in her daily classes. The students readily enjoy the game playability and enjoyment factor. They become active listeners to her math instructions everyday.
******
### Wireframes, mockups, diagrams etc. that were created as part of the design process.
https://github.com/LogicAtom/TargetShooter/tree/main/wireframes/versions/version2

Documentation for wireframes: I have included the wireframes in sequential order to show my direction for the layout, even though the final product doesn't use some of the elements. Its pretty self explanatory.

#### Features
Feature 1  - allows users to play a fun game
Feature 2  - has interactive functionality via the keyboard arrow buttons.
Feature 3  - one handed accessibilty controls.
 
##### Existing Features
- Keyboard arrow controls
= up arrow = accelerate forwards
= left arrow, right arrow = rotate Hunter
= spacebar, down arrow = shoot bullets at targets

### Features Left to Implement
= Mouse functionality
Touch interaction

#### Currently fixing = 
= Mouse functionality
= Touch functionality

## Technologies Used
HTML5 Canvas - https://en.wikipedia.org/wiki/HTML5, https://html.spec.whatwg.org/multipage/
CSS3 - https://www.w3.org/Style/CSS/Overview.en.html
Vanilla JavaScript - https://www.javascript.com/
Modernizr - https://modernizr.com/

## Testing
https://validator.w3.org/nu/?doc=https%3A%2F%2Flogicatom.github.io%2FTargetShooter%2F
https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Flogicatom.github.io%2FTargetShooter%2F&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en

Performance Testing:
Result=Score 100
http://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Flogicatom.github.io%2FTargetShooter%2F

I have performed extensive testing on each and every step of this project.
I had 8 other testers with different devices test as well. = Results, fully functional.

Game window screen attempting to move the lives and score off of the main game screen...I tried changing the drawScreen function, ctx.fillRect attribute for height -20px = result is a failure as the targets and the ship can travel into that empty space and cause unexpected visual distortions.

Compatibility Testing:

http://mobilehtml5.org/

Code Errors Testing:

DevTools > Toggle Device Toolbar

https://www.lambdatest.com/

https://jshint.com/

Validation Testing:

http://validator.w3.org/ (HTML5)
https://jigsaw.w3.org/css-validator/ (CSS3)


Performance Testing:

http://developers.google.com/speed/pagespeed/insights/

#### Currently testing ...I tried my best for over 8 months to get touch screen events to work with html5 canvas, but I failed at being successful.
= RWD Canvas API controls, using code referenced from a physical book named: HTML5 Canvas - Native Interactivity and Animation for the Web, 2nd edition, by O'REILLY publishing, Authors: Steve Fulton & Jeff Fulton, ISBN 978-1-449-33498-7

## Deployment

https://github.com/LogicAtom/TargetShooter/deployments/activity_log?environment=github-pages

I uploaded the project directly to Github using Github Desktop and pushed the project to Github Pages.

Source = Local PC files
Target = GitHub Repository (https://github.com/LogicAtom/TargetShooter)

Change of plans...i used GitPod this time for resubmission. :)

Deployment via GitPod using git 
Alternate Deployment via Microsoft Visual Studio Code

CLONING:  https://github.com/LogicAtom/TargetShooter.git (or) gh repo clone LogicAtom/TargetShooter
via GitHub Desktop: x-github-client://openRepo/https://github.com/LogicAtom/TargetShooter
Download .zip file:  https://github.com/LogicAtom/TargetShooter/archive/refs/heads/main.zip


### Content
HTML5 Canvas - https://en.wikipedia.org/wiki/HTML5, https://html.spec.whatwg.org/multipage/
CSS3 - https://www.w3.org/Style/CSS/Overview.en.html
Vanilla JavaScript - https://www.javascript.com/
Javascript Modal - https://www.w3schools.com/howto/howto_css_modals.asp
Modernizr JS - Compatibility - https://modernizr.com/

### Media
I took pictures of my design wireframe, mockup, and diagram from my dry erase board at home.

Audio files are from: StarCraft 2 by Blizzard North. and by https://www.youtube.com/watch?v=H9CSWMxJx84

FavIcon from:  https://favicon.io/emoji-favicons/direct-hit

### Credits and Acknowledgements

Anthony Kozloski - Coder

Code Institute - FullStack Boot Camp
Code Institute - for having me create a JavaScript - Frontend interactive project

Code Institute - Tutors for all your help..you rock!

I got inspiration for this project from the Asteroids game tutorial on youtube from freecodecamp
- https://www.youtube.com/watch?v=H9CSWMxJx84

Ed Logg and Lyle Rains for being the original creators of Atari Asteroids

HTML5 Canvas - Native Interactivity and Animation for the Web, 2nd edition, by O'REILLY publishing, Authors: Steve Fulton & Jeff Fulton, ISBN 978-1-449-33498-7

https://modernizr.com/

http://mobilehtml5.org/

Physical books:
assets/img/20210716_114512.jpg
assets/img/20210731_082235.jpg

HTML and CSS by: Joe Casabona 9th edition - ISBN-13=978-0-13-670256-6 = Testing sites
https://gs.statcounter.com/platform-market-share/desktop-mobile-tablet/europe
https://gs.statcounter.com/screen-resolution-stats

DevTools > Toggle Device Toolbar

https://www.lambdatest.com/

http://validator.w3.org/


http://developers.google.com/speed/pagespeed/insights/

https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal

https://ian.hixie.ch/ (The Editor of the HTML5 Spec)

I would personally like to thank my friends and family for putting up with me during the stress of building this project.
+ Anthony Kozloski: dad ...you taught me so much about life and I wanted to make a disabled person's game so you could play it. I didn't get it completed in time before you passed away. I love you and miss you.
+ Peggy Gallagher: <3 teacher/friend/time & space giver
+ Audrey Kozloski: mom ...thanks for all those amazing home cooked meals!  yum :)
+ Jeff Showers: neighbor/friend/additional game tester
+ Rosie(hamster/ninja warrior): my 2am school break entertainer
