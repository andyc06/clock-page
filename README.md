# clock-page
Simple multiple timezone dates & times displayed on a webpage.

I couldn't find a simple, uncluttered, and completely free digital world clock, so I made one!

This uses no external libraries, and as such, I'm doing some _less-than-ideal_ string parsing of the toLocaleString() outputs. There's also some regrettably repetitive code for each of the clock rows. In the future, I might update this to use a library like Luxon or Day.js. It seems to run okay for now though.

The default Display seconds preference can be set by changing the ```seconds``` variable in ```script.js```

Feel free to fork and improve upon it or customize it as you see fit.
