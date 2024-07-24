import { Treasure } from "../lottie";

const Footer = () => {
  return (

    <footer className="flex justify-between items-center border-t-2 border-teal-500 bg-slate-800 text-white text-center italic" >
      {/* <div className="grid justify-items-start"><Treasure /></div> */}
      <Treasure />
      <h5>&copy; 2024 Sale Spotter Designed & Created by Larry Wisniewski, Fon Knp, Aaron Allen & Katie Rose Alford</h5>
      {/* <div className="grid justify-items-end"><Treasure /></div> */}
      <Treasure />
    </footer>
  );
};

export default Footer;
