import {DriveEntry} from '../../files/drive-entry';
import React, {useMemo} from 'react';
import {Table} from '../../../common/ui/tables/table';
import {
  DriveSortDescriptor,
  driveState,
  useDriveStore,
} from '../../drive-store';
import {FileTableRow} from './file-table-row';
import {useViewItemActionHandler} from '../use-view-item-action-handler';
import {useIsMobileMediaQuery} from '../../../common/utils/hooks/is-mobile-media-query';
import {fileTableColumns} from './file-table-columns';
import {fileTableMobileColumns} from './file-table-mobile-columns';

interface Props {
  entries: DriveEntry[];
}
export function FileTable({entries}: Props) {
  const isMobile = useIsMobileMediaQuery();
  const {performViewItemAction} = useViewItemActionHandler();
  const selectedEntries = useDriveStore(s => s.selectedEntries);
  const sortDescriptor = useDriveStore(s => s.sortDescriptor);

  const selectedRows = useMemo(() => {
    return [...selectedEntries];
  }, [selectedEntries]);

  return (
    <Table
      hideHeaderRow={!!isMobile}
      columns={isMobile ? fileTableMobileColumns : fileTableColumns}
      data={entries}
      sortDescriptor={sortDescriptor}
      onSortChange={value => {
        driveState().setSortDescriptor(value as DriveSortDescriptor);
      }}
      onAction={performViewItemAction}
      selectedRows={selectedRows}
      selectionStyle="highlight"
      renderRowAs={FileTableRow}
      onSelectionChange={value => {
        driveState().selectEntries(value as number[]);
      }}
    />
  );
}
