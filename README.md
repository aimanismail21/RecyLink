April 8, 2019

COMP 1930 - Group Nine

Project Name: RecyLINK: A BCIT Project on Sustainability

Team: Jilliane Vina, John Gilpin, and Aiman Ismail
------------------------------------------------------------------------------------------------

Introduction

Welcome to our project's repository. You will find the source code used in our project in the public folder. This folder, 'public', contains our HTML pages, our JS directory, our images directory, and css style sheet directory.

------------------------------------------------------------------------------------------------
Public Directory - A collection of HTML pages that are deployed on our hosted website

index.html
- The main landing page of our website
- Submit Feedback (located near the bottom) allows users to submit their name, email, and feedback to us. The collected information is stored via Firebase so we have a collection of this information on hand.

knowledgebase.html
- The navigational page that explains the purpose of knowledgbase and presents two options the user can click to traverse the knowledgebase
- Search functionality is not working at this time

knowledgebase_guides.html
- A repository of dynamically filled information on recycling items. The item information can be pulled from our database by clicking on the accordion buttons.
- Search functionality is not working at this time

knowledgebase_my_area.html
- This part of the website is currently under construction. The goals for this page are to include a responsive list of recycling schedules that populates based on your location (after permission is given to google api)

newsletter.html
- This part of the website is dedicated to gathering user emails for a digitally subscribed newsletter
- There is no newsletter at this time
- Submitted emails are stored in our database

services_near_you.html
- Mapping of recycling points relative to user location or search parameters
- The map autopopulates to the Vancouver area by default but can be narrowed down either through lcoation permissions or search
- The list of places, on the left, are clickable objects that center the map on that location
- Map locations can be clicked on to plot a route to that location
------------------------------------------------------------------------------------------------
JS Directory
- A collection of javascript files that were used on our website

firebase_init.js
- Initialized our database usage on our website

guides.js
- Dynamically pulls information from database and populates containers on the html page.

index.js
- Dynamically stores feedback form submission on our database

map.js
- Controls the google map api and how it behaves on our servers_near_you.html

newsletter.js
- A simple collection of user email for a digital newsletter. Emails are collected and stored on our database
------------------------------------------------------------------------------------------------
Images
- A collection of images used on our website
------------------------------------------------------------------------------------------------

CSS_Style_Sheets Directory
------------------------------------------------------------------------------------------------
font-awesome.min.css
- A font style we preferred for the website

guides_css.css
- The stylesheet used for knowledgebase guides

main.css
- The standardized stylesheet used on the majority of our webpages

map.css
- Stylesheet for services_near_you.html

newsletter.css
- Stylesheet used for the newsletter.html 

recycling_services.css
- Stylesheet used for recycling_services_near_you.html
