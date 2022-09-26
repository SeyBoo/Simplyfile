import {HStack, ScrollView} from "native-base";
import AddDirectory from "./addDirectory";
import DirectoryCard from "./directoryCard";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../../common/hooks/store";
import {fetchDirectories} from "../store/thunks";

export default function DirectoriesList() {
  const dispatch = useAppDispatch();
  const directories = useAppSelector(state => state.directories.directories);

  useEffect(() => {
    if (directories === null) {
      (async () => {
        try {
          await dispatch(fetchDirectories());
        } catch (e) {
          console.log(e)
        }
      })()
    }
  }, [directories])

  return (
      <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          mt={5}
      >
        <HStack>
          <AddDirectory/>
          {directories?.map(directory =>
              <DirectoryCard
                  name={directory.name}
                  key={directory.uuid}
                  uuid={directory.uuid}
              />
          )}
        </HStack>
      </ScrollView>
  )
}
