import React, { useMemo, useState } from "react";
import { Box, Stack } from "@chakra-ui/react";
import Button from "@jetbrains/ring-ui/dist/button/button";
import Select from "@jetbrains/ring-ui/dist/select/select";
import Alert from "@jetbrains/ring-ui/dist/alert-service/alert-service";
import { OptionType } from "../types/application";
import { observer } from "mobx-react-lite";
import { ytAPI } from "../utils/yt-api";
import { ResourceTable } from "./table";
import { useTableStore } from "../slices/table-slice";

const useGetProjects = () => {
  const projects = useMemo(() => {
    return ytAPI.data.projects.map((project) => {
      return {
        key: project.id,
        label: project.name,
        avatar: project.iconUrl,
      };
    });
  }, []);

  return projects;
};

const useGetMembers = () => {
  const members = useMemo(() => {
    return ytAPI.data.members.map((member) => ({
      key: member.id,
      label: member.name,
    }));
  }, []);

  return members;
};

export const Widget = observer(() => {
  const [editing, setEditing] = useState(false);
  const projectsDataSource = useGetProjects();
  const members = useGetMembers();
  const [selectedUser, setSelectedUser] = useState<OptionType | null>(null);
  const { hasMember, addMember } = useTableStore();

  const toggleEditing = () => {
    setEditing(!editing);

    window.scroll({ top: 0 });
  };

  const handleUserSelect = (value: any) => {
    setSelectedUser(value);
  };

  const handleUserAdd = () => {
    if (!selectedUser) {
      Alert.warning("Вы не выбрали специалиста");
      return;
    }

    if (hasMember(selectedUser.label)) {
      Alert.warning("Выбранный специалист уже в таблице");
      return;
    }

    setSelectedUser(null);
    addMember(selectedUser.label);
  };

  return (
    <Box m="12px">
      <ResourceTable editing={editing} projects={projectsDataSource} />
      <Stack direction="row" justifyContent="space-between">
        <Button onClick={toggleEditing} primary>
          {editing ? "Завершить редактирование" : "Редактировать"}
        </Button>
        <Stack direction="row">
          <Button className="ring-ui-border" onClick={handleUserAdd}>
            Добавить
          </Button>
          <Select
            buttonClassName="ring-ui-border"
            onSelect={handleUserSelect}
            hint="Специалисты"
            label="Выберите специалиста"
            data={members}
            selected={selectedUser}
            filter={true}
          />
        </Stack>
      </Stack>
    </Box>
  );
});
