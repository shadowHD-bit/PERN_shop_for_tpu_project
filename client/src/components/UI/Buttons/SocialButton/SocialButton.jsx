import styles from "./SocialButton.scss";

export const SocialButton = ({ children, link }) => {
  return (
    <a href={link} style={styles.buttons}>
      {children}
    </a>
  );
};
