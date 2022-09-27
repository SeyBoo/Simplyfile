import React, {FunctionComponent, useEffect} from 'react';
import PageLayout from '../../common/layouts/pageLayout';
import {useAppDispatch, useAppSelector} from '../../common/hooks/store';
import {fetchDirectory} from '../../modules/directories/store/thunks';
import {Spinner} from 'native-base';
import {AuthStackParamList} from '../../common/navigation/authRoutes';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export const Directory: FunctionComponent<NativeStackScreenProps<AuthStackParamList, 'Directory'>> = ({route}) => {
  const {uuid} = route.params;
  const dispatch = useAppDispatch();
  const directory = useAppSelector(state => state.directories.currentDirectory);

  useEffect(() => {
    (async () => {
      try {
        await dispatch(fetchDirectory(uuid));
      } catch (e) {
        console.log(e);
      }
    })();
  }, [directory?.metadata.uuid, dispatch, uuid]);

  if (directory === null || directory?.metadata?.uuid !== uuid) {
    return <Spinner/>;
  }

  return (
      <PageLayout title={directory.metadata.name} subtitle="directory">
      </PageLayout>
  );
};
