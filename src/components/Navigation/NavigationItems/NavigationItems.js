import React from "react";

import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = props => {
  let links = (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/react/emojiPets">Login</NavigationItem>
    </ul>
  );
  if (props.isAuthenticated) {
    links = (
      <ul className={classes.NavigationItems}>
        <NavigationItem link="/react/emoji-pets">Home</NavigationItem>   
        <NavigationItem link="/react/emoji-pets/friends">Friends</NavigationItem>   
        <NavigationItem link="/react/emoji-pets/edit-pet-profile">
          Edit Pet Profile
        </NavigationItem>   
        <NavigationItem link="/react/emoji-pets/logout">Logout</NavigationItem>
      </ul>
    );
  }
  return links;
};

export default navigationItems;
