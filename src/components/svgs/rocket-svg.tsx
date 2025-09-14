"use client";

import { motion } from "motion/react";
import { useState } from "react";

// Rocket Body Component
const RocketBody = ({
  isScattered,
  delay = 0,
}: {
  isScattered: boolean;
  delay?: number;
}) => (
  <motion.g
    initial={{ x: 0, y: 0, rotate: 0 }}
    animate={
      isScattered
        ? {
            x: [0, -50, 0],
            y: [0, -30, 0],
            rotate: [0, -15, 0],
            scale: [1, 1.1, 1],
          }
        : {
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
          }
    }
    transition={{
      duration: 0.8,
      delay: delay,
      ease: "easeInOut",
    }}
  >
    {/* Main rocket body sections */}
    <path
      d="M244.555 199.27V327.58C244.555 332.34 242.345 337.12 237.925 341.33C236.045 343.14 233.765 344.83 231.065 346.39C213.065 356.77 183.895 356.77 165.915 346.39C163.225 344.83 160.935 343.139 159.055 341.339C154.625 337.119 152.415 332.35 152.415 327.58V199.27C152.415 204.98 155.405 210.329 161.915 215.409C162.165 215.619 162.425 215.82 162.675 216.01C163.665 216.75 164.755 217.41 165.905 218.07C183.895 228.46 213.065 228.46 231.055 218.07C232.205 217.41 233.285 216.72 234.285 216.01C241.125 211.14 244.545 205.2 244.545 199.27H244.555Z"
      fill="#E2DEFF"
      stroke="#5634D1"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M244.555 327.58V384.24C244.555 389 242.345 393.78 237.925 397.99C236.045 399.8 233.765 401.49 231.065 403.05C213.065 413.43 183.895 413.43 165.915 403.05C163.225 401.49 160.935 399.8 159.055 398C154.625 393.78 152.415 389.01 152.415 384.24V327.58C152.415 333.29 155.405 338.64 161.915 343.72C162.165 343.93 162.425 344.13 162.675 344.32C163.665 345.06 164.755 345.72 165.905 346.38C183.895 356.77 213.065 356.77 231.055 346.38C232.205 345.72 233.285 345.03 234.285 344.32C241.125 339.45 244.545 333.51 244.545 327.58H244.555Z"
      fill="#9F85FF"
      stroke="#5634D1"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M244.555 381.9V524.71C244.555 529.47 242.345 534.25 237.925 538.46C236.045 540.27 233.765 541.96 231.065 543.52C213.065 553.9 183.895 553.9 165.915 543.52C163.225 541.96 160.935 540.27 159.055 538.47C154.625 534.25 152.415 529.48 152.415 524.71V381.9C152.415 387.61 155.405 392.96 161.915 398.04C162.165 398.25 162.425 398.45 162.675 398.64C163.665 399.38 164.755 400.04 165.905 400.7C183.895 411.09 213.065 411.09 231.055 400.7C232.205 400.04 233.285 399.35 234.285 398.64C241.125 393.77 244.545 387.83 244.545 381.9H244.555Z"
      fill="#8053F6"
      stroke="#5634D1"
      strokeWidth="1.2"
      strokeMiterlimit="10"
    />
  </motion.g>
);

// Rocket Nose Cone Component
const RocketNose = ({
  isScattered,
  delay = 0,
}: {
  isScattered: boolean;
  delay?: number;
}) => (
  <motion.g
    initial={{ x: 0, y: 0, rotate: 0 }}
    animate={
      isScattered
        ? {
            x: [0, 60, 0],
            y: [0, -80, 0],
            rotate: [0, 25, 0],
            scale: [1, 0.8, 1],
          }
        : {
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
          }
    }
    transition={{
      duration: 0.8,
      delay: delay,
      ease: "easeInOut",
    }}
  >
    <path
      d="M235.595 168.529V195.5C235.595 199.34 233.815 203.18 230.255 206.57C228.745 208.02 226.905 209.39 224.735 210.64C210.245 219 186.745 219 172.255 210.64C170.085 209.39 168.245 208.02 166.735 206.57C163.165 203.17 161.385 199.33 161.385 195.49V168.52C161.385 173.12 163.795 177.43 169.035 181.52C169.235 181.69 169.445 181.85 169.655 182C170.445 182.59 171.335 183.129 172.255 183.659C186.745 192.029 210.235 192.029 224.735 183.659C225.665 183.129 226.535 182.57 227.335 182C232.845 178.08 235.595 173.29 235.595 168.52V168.529Z"
      fill="#9F85FF"
      stroke="#5634D1"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M235.595 142.569V169.539C235.595 173.379 233.815 177.219 230.255 180.609C228.745 182.059 226.905 183.429 224.735 184.679C210.245 193.039 186.745 193.039 172.255 184.679C170.085 183.429 168.245 182.059 166.735 180.609C163.165 177.209 161.385 173.369 161.385 169.529V142.559C161.385 147.159 163.795 151.469 169.035 155.559C169.235 155.729 169.445 155.889 169.655 156.039C170.445 156.629 171.335 157.169 172.255 157.699C186.745 166.069 210.235 166.069 224.735 157.699C225.665 157.169 226.535 156.609 227.335 156.039C232.845 152.119 235.595 147.329 235.595 142.559V142.569Z"
      fill="#E2DEFF"
      stroke="#5634D1"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M235.595 116.61V143.58C235.595 147.42 233.815 151.26 230.255 154.65C228.745 156.1 226.905 157.47 224.735 158.72C210.245 167.08 186.745 167.08 172.255 158.72C170.085 157.47 168.245 156.1 166.735 154.65C163.165 151.25 161.385 147.41 161.385 143.57V116.6C161.385 121.2 163.795 125.51 169.035 129.6C169.235 129.77 169.445 129.93 169.655 130.08C170.445 130.67 171.335 131.21 172.255 131.74C186.745 140.11 210.235 140.11 224.735 131.74C225.665 131.21 226.535 130.65 227.335 130.08C232.845 126.16 235.595 121.37 235.595 116.6V116.61Z"
      fill="#9F85FF"
      stroke="#5634D1"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.g>
);

// Left Fin Component
const LeftFin = ({
  isScattered,
  delay = 0,
}: {
  isScattered: boolean;
  delay?: number;
}) => (
  <motion.g
    initial={{ x: 0, y: 0, rotate: 0 }}
    animate={
      isScattered
        ? {
            x: [0, -100, 0],
            y: [0, 50, 0],
            rotate: [0, -45, 0],
            scale: [1, 0.7, 1],
          }
        : {
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
          }
    }
    transition={{
      duration: 0.8,
      delay: delay,
      ease: "easeInOut",
    }}
  >
    <path
      d="M130.895 522.469V531.679C130.895 531.679 137.084 539.939 152.424 539.939C167.755 539.939 173.955 531.679 173.955 531.679V522.469C173.955 522.469 167.755 530.729 152.424 530.729C137.084 530.729 130.895 522.469 130.895 522.469Z"
      fill="#8053F6"
      stroke="#5634D1"
      strokeWidth="1.2"
      strokeMiterlimit="10"
    />
    <path
      d="M130.895 506.289V522.469C130.895 522.469 137.084 530.729 152.424 530.729C167.755 530.729 173.955 522.469 173.955 522.469V506.289C173.955 506.289 167.755 514.549 152.424 514.549C137.084 514.549 130.895 506.289 130.895 506.289Z"
      fill="#9F85FF"
      stroke="#5634D1"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M130.895 433.059V506.289C130.895 506.289 137.085 514.549 152.425 514.549C157.565 514.549 161.665 513.619 164.855 512.389L164.525 512.289V439.279L152.415 386.029L130.885 433.059H130.895Z"
      fill="#E2DEFF"
      stroke="#5634D1"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M152.425 386.029L164.535 439.279V512.289L164.865 512.389C171.215 509.949 173.965 506.289 173.965 506.289V433.059L152.435 386.029H152.425Z"
      fill="#E2DEFF"
      stroke="#5634D1"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.g>
);

// Right Fin Component
const RightFin = ({
  isScattered,
  delay = 0,
}: {
  isScattered: boolean;
  delay?: number;
}) => (
  <motion.g
    initial={{ x: 0, y: 0, rotate: 0 }}
    animate={
      isScattered
        ? {
            x: [0, 100, 0],
            y: [0, 50, 0],
            rotate: [0, 45, 0],
            scale: [1, 0.7, 1],
          }
        : {
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
          }
    }
    transition={{
      duration: 0.8,
      delay: delay,
      ease: "easeInOut",
    }}
  >
    <path
      d="M266.095 522.469V531.679C266.095 531.679 259.905 539.939 244.565 539.939C229.225 539.939 223.035 531.679 223.035 531.679V522.469C223.035 522.469 229.235 530.729 244.565 530.729C259.895 530.729 266.095 522.469 266.095 522.469Z"
      fill="#8053F6"
      stroke="#5634D1"
      strokeWidth="1.2"
      strokeMiterlimit="10"
    />
    <path
      d="M266.095 506.289V522.469C266.095 522.469 259.905 530.729 244.565 530.729C229.225 530.729 223.035 522.469 223.035 522.469V506.289C223.035 506.289 229.235 514.549 244.565 514.549C259.895 514.549 266.095 506.289 266.095 506.289Z"
      fill="#9F85FF"
      stroke="#5634D1"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M266.095 433.059V506.289C266.095 506.289 259.905 514.549 244.565 514.549C239.425 514.549 235.325 513.619 232.135 512.389L232.465 512.289V439.279L244.575 386.029L266.105 433.059H266.095Z"
      fill="white"
      stroke="#5634D1"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M244.555 386.029L232.445 439.279V512.289L232.115 512.389C225.765 509.949 223.015 506.289 223.015 506.289V433.059L244.545 386.029H244.555Z"
      fill="#E2DEFF"
      stroke="#5634D1"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.g>
);

// Window Component
const Window = ({
  isScattered,
  delay = 0,
}: {
  isScattered: boolean;
  delay?: number;
}) => (
  <motion.g
    initial={{ x: 0, y: 0, rotate: 0 }}
    animate={
      isScattered
        ? {
            x: [0, 30, 0],
            y: [0, -40, 0],
            rotate: [0, 180, 0],
            scale: [1, 1.3, 1],
          }
        : {
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
          }
    }
    transition={{
      duration: 0.8,
      delay: delay,
      ease: "easeInOut",
    }}
  >
    <path
      d="M203.525 281.01H193.455C192.35 281.01 191.455 281.905 191.455 283.01V301.68C191.455 302.784 192.35 303.68 193.455 303.68H203.525C204.629 303.68 205.525 302.784 205.525 301.68V283.01C205.525 281.905 204.629 281.01 203.525 281.01Z"
      fill="#9F85FF"
      stroke="#5634D1"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.g>
);

// Top Section Component (Capsule)
const TopSection = ({
  isScattered,
  delay = 0,
}: {
  isScattered: boolean;
  delay?: number;
}) => (
  <motion.g
    initial={{ x: 0, y: 0, rotate: 0 }}
    animate={
      isScattered
        ? {
            x: [0, 40, 0],
            y: [0, -100, 0],
            rotate: [0, 30, 0],
            scale: [1, 0.9, 1],
          }
        : {
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
          }
    }
    transition={{
      duration: 0.8,
      delay: delay,
      ease: "easeInOut",
    }}
  >
    <path
      d="M235.595 142.568C235.595 147.348 232.845 152.138 227.335 156.048C226.525 156.618 225.655 157.178 224.735 157.708C210.245 166.078 186.745 166.078 172.255 157.708C171.325 157.178 170.445 156.638 169.655 156.048C169.445 155.888 169.235 155.738 169.035 155.568C163.795 151.468 161.385 147.168 161.385 142.568C161.385 137.088 165.015 131.598 172.255 127.418C186.745 119.048 210.235 119.048 224.735 127.418C231.975 131.598 235.595 137.078 235.595 142.568Z"
      fill="white"
      stroke="#5634D1"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M219.085 146.36C218.075 148.2 216.305 149.93 213.775 151.39C205.335 156.26 191.655 156.26 183.215 151.39C180.685 149.93 178.915 148.2 177.905 146.36C175.545 142.05 177.315 137.16 183.215 133.75C191.655 128.88 205.335 128.88 213.775 133.75C219.685 137.16 221.465 142.06 219.085 146.36Z"
      fill="#9F85FF"
      stroke="#5634D1"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M219.085 146.358C218.075 148.198 216.305 149.928 213.775 151.388C205.335 156.258 191.655 156.258 183.215 151.388C180.685 149.928 178.915 148.198 177.905 146.358C178.925 144.518 180.685 142.788 183.215 141.328C191.655 136.458 205.335 136.458 213.775 141.328C216.305 142.788 218.085 144.518 219.085 146.358Z"
      fill="#8053F6"
      stroke="#5634D1"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.g>
);

// Additional Windows Component
const AdditionalWindows = ({
  isScattered,
  delay = 0,
}: {
  isScattered: boolean;
  delay?: number;
}) => (
  <motion.g
    initial={{ x: 0, y: 0, rotate: 0 }}
    animate={
      isScattered
        ? {
            x: [0, 20, 0],
            y: [0, -20, 0],
            rotate: [0, 90, 0],
            scale: [1, 1.2, 1],
          }
        : {
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
          }
    }
    transition={{
      duration: 0.8,
      delay: delay,
      ease: "easeInOut",
    }}
  >
    <path
      d="M170.855 298.47L163.035 293.55C162.005 292.9 161.375 291.76 161.375 290.54V273C161.375 272.07 162.405 271.5 163.195 272L171.015 276.92C172.045 277.57 172.675 278.71 172.675 279.93V297.47C172.675 298.4 171.645 298.97 170.855 298.47Z"
      fill="#9F85FF"
      stroke="#5634D1"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M226.125 298.47L233.945 293.55C234.975 292.9 235.605 291.76 235.605 290.54V273C235.605 272.07 234.575 271.5 233.785 272L225.965 276.92C224.935 277.57 224.305 278.71 224.305 279.93V297.47C224.305 298.4 225.335 298.97 226.125 298.47Z"
      fill="#9F85FF"
      stroke="#5634D1"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.g>
);

// Bottom Mini Rockets Component
const BottomMiniRockets = ({
  isScattered,
  delay = 0,
}: {
  isScattered: boolean;
  delay?: number;
}) => (
  <motion.g
    initial={{ x: 0, y: 0, rotate: 0 }}
    animate={
      isScattered
        ? {
            x: [0, 0, 0],
            y: [0, 80, 0],
            rotate: [0, 0, 0],
            scale: [1, 1.1, 1],
          }
        : {
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
          }
    }
    transition={{
      duration: 0.8,
      delay: delay,
      ease: "easeInOut",
    }}
  >
    <path
      d="M247.765 541.889V551.099C247.765 551.099 241.575 559.359 226.235 559.359C210.895 559.359 204.705 551.099 204.705 551.099V541.889C204.705 541.889 210.905 550.149 226.235 550.149C241.565 550.149 247.765 541.889 247.765 541.889Z"
      fill="#8053F6"
      stroke="#5634D1"
      strokeWidth="1.2"
      strokeMiterlimit="10"
    />
    <path
      d="M247.765 525.709V541.889C247.765 541.889 241.575 550.149 226.235 550.149C210.895 550.149 204.705 541.889 204.705 541.889V525.709C204.705 525.709 210.905 533.969 226.235 533.969C241.565 533.969 247.765 525.709 247.765 525.709Z"
      fill="#9F85FF"
      stroke="#5634D1"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M192.284 541.889V551.099C192.284 551.099 186.095 559.359 170.755 559.359C155.425 559.359 149.224 551.099 149.224 551.099V541.889C149.224 541.889 155.425 550.149 170.755 550.149C186.085 550.149 192.284 541.889 192.284 541.889Z"
      fill="#8053F6"
      stroke="#5634D1"
      strokeWidth="1.2"
      strokeMiterlimit="10"
    />
    <path
      d="M192.284 525.709V541.889C192.284 541.889 186.095 550.149 170.755 550.149C155.415 550.149 149.224 541.889 149.224 541.889V525.709C149.224 525.709 155.425 533.969 170.755 533.969C186.085 533.969 192.284 525.709 192.284 525.709Z"
      fill="#9F85FF"
      stroke="#5634D1"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </motion.g>
);

// Bottom Stand Component
const BottomStand = ({
  isScattered,
  delay = 0,
}: {
  isScattered: boolean;
  delay?: number;
}) => (
  <motion.g
    initial={{ x: 0, y: 0, rotate: 0 }}
    animate={
      isScattered
        ? {
            x: [0, 0, 0],
            y: [0, 60, 0],
            rotate: [0, 0, 0],
            scale: [1, 1.05, 1],
          }
        : {
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
          }
    }
    transition={{
      duration: 0.8,
      delay: delay,
      ease: "easeInOut",
    }}
  >
    <path
      d="M393.285 577.139C393.285 579.259 391.884 581.369 389.084 582.989L387.745 583.759L376.324 590.359C370.734 593.589 361.675 593.589 356.075 590.359C353.285 588.749 349.615 587.939 345.955 587.939C342.295 587.939 338.624 588.749 335.834 590.359H335.805C330.215 593.609 330.215 598.839 335.805 602.059C336.285 602.329 336.724 602.629 337.115 602.929C338.924 604.309 339.865 605.939 339.984 607.579V607.679C339.995 607.759 339.995 607.819 339.995 607.899C339.995 608.029 339.995 608.159 339.984 608.299C339.814 610.269 338.424 612.239 335.805 613.739L334.575 614.449L263.024 655.759C257.424 658.989 248.354 658.989 242.774 655.759C239.984 654.149 236.314 653.339 232.654 653.339C228.994 653.339 225.314 654.149 222.524 655.759H222.515C216.915 659.009 216.915 664.229 222.515 667.459C222.995 667.729 223.425 668.029 223.825 668.329C225.735 669.799 226.695 671.559 226.695 673.309C226.695 675.429 225.305 677.539 222.515 679.159L221.285 679.869L209.765 686.519C204.165 689.749 195.115 689.749 189.515 686.519L11.5345 583.759L10.1945 582.979C7.61453 581.499 6.23449 579.589 6.02449 577.639V577.609C5.79449 575.339 7.18453 573.019 10.1945 571.279L22.9545 563.909C28.5445 560.689 37.6045 560.689 43.1945 563.909C46.0045 565.529 49.6645 566.339 53.3245 566.339C56.4445 566.339 59.5545 565.759 62.1445 564.569C62.5945 564.379 63.0245 564.149 63.4445 563.909H63.4745C68.6145 560.939 69.0245 556.259 64.7045 553.039C64.3245 552.749 63.9145 552.479 63.4745 552.219H63.4645C60.8445 550.699 59.4645 548.749 59.2945 546.779V546.739C59.1245 544.489 60.5145 542.229 63.4645 540.529L136.255 498.509C141.845 495.279 150.905 495.279 156.505 498.509C159.295 500.119 162.965 500.929 166.625 500.929C169.755 500.929 172.885 500.349 175.475 499.159C175.915 498.969 176.345 498.739 176.765 498.509H176.774C181.914 495.519 182.325 490.849 178.005 487.619C177.625 487.329 177.214 487.059 176.774 486.799C173.984 485.179 172.575 483.069 172.575 480.949C172.575 478.829 173.974 476.719 176.774 475.099L189.535 467.729C195.124 464.499 204.184 464.499 209.785 467.729L389.104 571.259C391.895 572.869 393.304 574.999 393.304 577.109L393.285 577.139Z"
      fill="#E2DEFF"
    />
  </motion.g>
);

// Decorative Elements Component
const DecorativeElements = ({
  isScattered,
  delay = 0,
}: {
  isScattered: boolean;
  delay?: number;
}) => (
  <motion.g
    initial={{ x: 0, y: 0, rotate: 0 }}
    animate={
      isScattered
        ? {
            x: [0, 10, 0],
            y: [0, -10, 0],
            rotate: [0, 45, 0],
            scale: [1, 0.8, 1],
          }
        : {
            x: 0,
            y: 0,
            rotate: 0,
            scale: 1,
          }
    }
    transition={{
      duration: 0.8,
      delay: delay,
      ease: "easeInOut",
    }}
  >
    <path
      d="M163.695 230.581C163.695 232.291 162.655 233.071 161.375 232.331C160.095 231.591 159.055 229.61 159.055 227.9C159.055 226.19 160.095 225.41 161.375 226.15C162.655 226.89 163.695 228.871 163.695 230.581Z"
      fill="#5634D1"
    />
    <path
      d="M163.695 330.59C163.695 332.3 162.655 333.08 161.375 332.34C160.095 331.6 159.055 329.62 159.055 327.91C159.055 326.2 160.095 325.42 161.375 326.16C162.655 326.9 163.695 328.88 163.695 330.59Z"
      fill="#5634D1"
    />
    <path
      d="M233.285 230.581C233.285 232.291 234.325 233.071 235.605 232.331C236.885 231.591 237.925 229.61 237.925 227.9C237.925 226.19 236.885 225.41 235.605 226.15C234.325 226.89 233.285 228.871 233.285 230.581Z"
      fill="#5634D1"
    />
    <path
      d="M233.285 330.59C233.285 332.3 234.325 333.08 235.605 332.34C236.885 331.6 237.925 329.62 237.925 327.91C237.925 326.2 236.885 325.42 235.605 326.16C234.325 326.9 233.285 328.88 233.285 330.59Z"
      fill="#5634D1"
    />
    <path
      d="M198.495 244.26C200.229 244.26 201.635 242.855 201.635 241.12C201.635 239.386 200.229 237.98 198.495 237.98C196.76 237.98 195.354 239.386 195.354 241.12C195.354 242.855 196.76 244.26 198.495 244.26Z"
      fill="#5634D1"
    />
    <path
      d="M198.495 345.28C200.229 345.28 201.635 343.874 201.635 342.14C201.635 340.406 200.229 339 198.495 339C196.76 339 195.354 340.406 195.354 342.14C195.354 343.874 196.76 345.28 198.495 345.28Z"
      fill="#5634D1"
    />
  </motion.g>
);

export const SVG = () => {
  const [isScattered, setIsScattered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleScatter = () => {
    setIsAnimating(true);
    setIsScattered(true);

    // Hold scattered state for 1 second
    setTimeout(() => {
      setIsScattered(false);
      // Reset animation state after reassembly
      setTimeout(() => {
        setIsAnimating(false);
      }, 1000);
    }, 1000);
  };

  return (
    <div className="">
      <motion.button
        onClick={handleScatter}
        disabled={isAnimating}
        className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isAnimating ? "Animating..." : "Scatter & Reassemble Rocket"}
      </motion.button>

      <svg
        width="400"
        height="689"
        viewBox="0 0 400 689"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="border border-gray-200 rounded-lg"
      >
        {/* Animated Rocket Components */}
        <RocketBody isScattered={isScattered} delay={0} />
        <RocketNose isScattered={isScattered} delay={0.1} />
        <TopSection isScattered={isScattered} delay={0.15} />
        <LeftFin isScattered={isScattered} delay={0.2} />
        <RightFin isScattered={isScattered} delay={0.3} />
        <Window isScattered={isScattered} delay={0.4} />
        <AdditionalWindows isScattered={isScattered} delay={0.45} />
        <BottomMiniRockets isScattered={isScattered} delay={0.5} />
        <BottomStand isScattered={isScattered} delay={0.6} />
        <DecorativeElements isScattered={isScattered} delay={0.7} />

        {/* Static decorative elements */}
        <g opacity={isScattered ? 0.3 : 1}>
          <path
            d="M340.005 583.219C340.015 583.349 340.015 583.479 340.015 583.609C340.015 583.729 340.015 583.839 340.005 583.959V583.219Z"
            fill="#E2DEFF"
            stroke="#5634D1"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </svg>
    </div>
  );
};
