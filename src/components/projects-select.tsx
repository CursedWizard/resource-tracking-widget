import React, { CSSProperties, useEffect, useState } from "react";
import TagsList from "@jetbrains/ring-ui/dist/tags-list/tags-list";
import { TagType } from "../types/resource-planning";
import Select, { SelectItem } from "@jetbrains/ring-ui/dist/select/select";
import { ToggleTagParams } from "@jetbrains/ring-ui/dist/tags-input/tags-input";
import { Box, Flex, IconButton } from "@chakra-ui/react";
import Tag from "@jetbrains/ring-ui/dist/tag/tag";
import AddIcon from "./icons/add-icon";

interface Props {
  tags: TagType[];
  options: SelectItem<unknown>[];
  maxPopupHeight: number;
  onTagAdd: (params: ToggleTagParams) => void;
  onTagRemove: (params: ToggleTagParams) => void;
}

const ProjectsSelect: React.FC<Props> = (props) => {
  const { tags, options, onTagAdd, onTagRemove } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const iconStyles: CSSProperties = {
    transform: open ? "rotate(45deg)" : "",
  };

  const handleSelect = (selected: SelectItem<TagType>) => {
    onTagAdd({ tag: selected });
  };

  const handleRemove = (tag: TagType) => {
    onTagRemove({ tag });
  };

  return (
    <>
      <Flex gap="4px" wrap="wrap">
        {tags.map((value, index) => (
          <Tag onRemove={() => handleRemove(value)} key={index}>
            {value.label}
          </Tag>
        ))}
        <Select
          onOpen={handleOpen}
          onClose={handleClose}
          onSelect={handleSelect}
          data={options}
          type={"CUSTOM" as any}
          customAnchor={({ wrapperProps, buttonProps, popup }) => {
            return (
              <span {...wrapperProps}>
                <IconButton
                  {...buttonProps}
                  aria-label="Add new project"
                  icon={<AddIcon style={iconStyles} />}
                  sx={{ width: "20px", height: "20px", minW: "20px" }}
                />
                {popup}
              </span>
            );
          }}
        />
      </Flex>
    </>
  );
};

export { ProjectsSelect };
