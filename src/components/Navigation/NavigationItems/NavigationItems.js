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
        <NavigationItem link="/react/emojiPets">Home</NavigationItem>
        <NavigationItem link="react/emojiPets">Friends</NavigationItem>
        <NavigationItem link="/react/emojiPets/settings">
          Edit My Pet
        </NavigationItem>
        <NavigationItem link="/react/emoji-pets/logout">Logout</NavigationItem>
      </ul>
    );
  }
  return links;
};

export default navigationItems;
