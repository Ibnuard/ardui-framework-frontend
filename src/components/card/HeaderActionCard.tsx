import React from "react";
import Button from "../ui/button/Button";

interface HeaderActionCard {
  title?: string;
  showTitle?: boolean;
  renderActionButton?: React.ReactNode;
  showSaveButton?: boolean;
  showCancelButton?: boolean;
  onSaveButtonPressed?: () => void;
  onCancelButtonPressed?: () => void;
}

const HeaderActionCard = (props: HeaderActionCard) => {
  return (
    <div className={`rounded-2xl border border-gray-200 bg-white`}>
      <div className="flex flex-row justify-between items-center p-4">
        <h2 className=" font-bold text-md">{props.title || "Title"}</h2>
        <div className="flex flex-row gap-2.5">
          {props.showSaveButton && (
            <Button size={"sm"} onClick={props.onSaveButtonPressed}>
              Save
            </Button>
          )}
          {props.showCancelButton && (
            <Button
              variant={"outline"}
              size={"sm"}
              className=" ring-red-300 text-red-500"
              onClick={props.onCancelButtonPressed}
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderActionCard;
