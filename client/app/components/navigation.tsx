import { Button } from "@mui/material";

export default function Navigation() {
  return (
    <div className="fixed top-0 left-0 z-[999] flex w-full flex-col h-[56px] gap-x-6 gap-y-2 bg-neutral-100 font-semibold text-sky-800">
      <div className="flex flex-row gap-2 my-auto ml-auto mr-16 relative right">
        <Button variant="outlined" href="#outlined-buttons">
          Sign-in
        </Button>

        <Button variant="contained" href="#contained-buttons">
          Sign-up
        </Button>
      </div>
    </div>
  );
}
