"use client";
import React from "react";
import { Box, useTheme } from "@mui/material";
import { keyframes } from "@emotion/react";



// Animation qui défile verticalement tout en variant l’opacité
const scrollDown = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    transform: translateY(100%);
    opacity: 0;
  }
`;
const Lines: React.FC = () => {
  const theme = useTheme();
  const dotColor = theme.palette.mode === "dark" ? "#bc7de8" : "#34c0eb";

  const rows = 15;
  const cols = 30;
  const dotSize = 4;
  const spacing = 28;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "grid",
          gridTemplateRows: `repeat(${rows}, ${spacing}px)`,
          gridTemplateColumns: `repeat(${cols}, ${spacing}px)`,
          width: "100%",
          height: "100%",
        }}
      >
        {Array.from({ length: rows * cols }).map((_, index) => {
          const col = index % cols;
          const row = Math.floor(index / cols);
          const delay = (col * 100) + (row * 50); 

          return (
            <Box
              key={index}
              sx={{
                width: dotSize,
                height: dotSize,
                borderRadius: "50%",
                backgroundColor: dotColor,
                //  backgroundColor: "red",
                opacity: 0,
                animation: `${scrollDown} 6s linear ${delay}ms infinite`,
              }}
            />
          );
        })}
      </Box>
    </Box>
  );
// };
  // const theme = useTheme();
  // const stroke = theme.palette.mode === "dark" ? "rgba(126, 83, 196, 0.43)" : "rgba(85, 175, 211, 0.45)";

  // return (
  //   <Box
  //     sx={{
  //       // position: "fixed",
  //       // top: 0,
  //       // left: 0,
  //       position: "absolute",
  //       top: 0,
  //       left: 0,
  //       zIndex: 0,
  //       pointerEvents: "none",
  //       height: "100vh",
  //       width: "100vw",
  //       display: "flex",
  //       justifyContent: "space-around",
  //       alignItems: "center",
  //     }}
  //   >
  //     {animationDurations.map((duration, index) => (
  //       <Box
  //         key={index}
  //         sx={{
  //           width: "1px",
  //           height: "100%",
  //           backgroundColor: stroke,
  //           animation: `${lineAnimation} ${duration} linear infinite`,
  //         }}
  //       />
  //     ))}
  //   </Box>
  // );
};

export default Lines;
