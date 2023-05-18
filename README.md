# Roger, Roger

## Introduction

"Roger, Roger" is a cooperative game about a rocket travelling through space. Players have to navigate through asteroids by cooperative with each other. There is a total of 3 controls that can be accessed: trajectory control, acceleration control, and gun. trajectory control lets the player control the y-axis of the rocket, acceleration control lets the player control the x-axis, and gun lets player shoots.
<!-- pictures -->

## The main screen

Upon the welcome screen, the player will be greeted with the title of the game, the IP address of the server, and the prompt "press space". The reason behind the IP address being displayed will be explained in [the control screen](#the-control-screen) section.

After all the players have connected and the captain pressed spacebar, the main screen shows the players the rocket they are controlling. It also shows the score and lives they have left. Group of asteroids are streaming through the right side of the screen at different velocity. The players have to use this visual display to based their control on. 

If the rocket ran out of life, the game ends. The last page will display the final score and whether you got the new highscore.

## The control screen
The control screen consisted of two parts: socket connection input and the control.

Socket connection input lets the player input the IP address of the server to gain control of the rocket. If the connection is successful, green circle appears on the right side of the input. This is because I want the server to be able to be hosted on the computer and in that case the IP address would be dynamically assigned. 

<!-- pictures -->

## The game mechanics
Player navigate through the group of asteroids. if they get hit, their lives decreases. they get points for shooting the asteroid depending on the size of it. But the velocity increase with the score. The gun have a cooldown period of two seconds so players have to be conservative about their shooting. 

## Software
The game use node to host the server, P5JS to draw the graphics, and socket.io to allow the communication between devices.

### The architecture
This is the UML of the game code.