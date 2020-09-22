import React from "react";

function Footer() {
  return (
    <footer
      style={{
        height: 40,
        width: "100%",
        position: "fixed",
        bottom: 0,
        textAlign: "center",
        background: "#000",
        color: "#fff",
      }}
    >
      <div
        style={{
          padding: 12,
        }}
      >
        Copyright &copy; {new Date().getFullYear()} build with love by{" "}
        <a
          href='https://github.com/afazzdev'
          target='_blank'
          rel='noopener noreferrer'
          style={{
            color: "skyblue",
          }}
        >
          @afazzdev
        </a>
      </div>
    </footer>
  );
}

export default Footer;
