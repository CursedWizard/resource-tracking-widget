import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  TableContainer,
  SystemStyleObject,
  Box,
  Stack,
} from "@chakra-ui/react";
import { MemberRow } from "./member-row";
import Button from "@jetbrains/ring-ui/dist/button/button";
import Select from "@jetbrains/ring-ui/dist/select/select";
import Alert from "@jetbrains/ring-ui/dist/alert-service/alert-service";
import { ToggleTagParams } from "@jetbrains/ring-ui/dist/tags-input/tags-input";
import { DayOfWeek, OptionType } from "../types/application";
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";
import _ from "lodash";
import { TagsByMember } from "../types/resource-planning";
import { tableDataStore } from "../utils/table-data";
import { ytAPI } from "../utils/yt-api";
import { ResourceTable } from "./table";

const useGetProjects = () => {
  const projects = useMemo(() => {
    return ytAPI.data.projects.map((project) => {
      return {
        key: project.id,
        label: project.name,
      };
    });
  }, []);

  return () => projects;
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

  const toggleEditing = () => {
    setEditing(!editing);

    tableDataStore.syncTagsEditingAndCache();
    window.scroll({ top: 0 });
  };

  const handleSelectUser = (value: any) => {
    setSelectedUser(value);
  };

  const handleAddUser = () => {
    if (!selectedUser) {
      Alert.warning("Вы не выбрали специалиста");
      return;
    }

    if (tableDataStore.hasMember(selectedUser.label)) {
      Alert.warning("Выбранный специалист уже в таблице");
      return;
    }

    setSelectedUser(null);
    tableDataStore.initByName(selectedUser.label);
    tableDataStore.syncTagsEditingAndCache();
  };

  return (
    <Box m="12px">
      <ResourceTable editing={editing} projects={projectsDataSource} />
      <Stack direction="row" justifyContent="space-between">
        <Button onClick={toggleEditing} primary>
          {editing ? "Завершить редактирование" : "Редактировать"}
        </Button>
        <Stack direction="row">
          <Button onClick={handleAddUser}>Добавить</Button>
          <Select
            onSelect={handleSelectUser}
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
