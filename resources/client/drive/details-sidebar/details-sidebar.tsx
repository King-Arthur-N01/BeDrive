import React, {ReactNode, useContext, useMemo} from 'react';
import {driveState} from '../drive-store';
import {
  useSelectedEntry,
  useSelectedEntryParent,
} from '../files/use-selected-entries';
import {DriveEntry} from '../files/drive-entry';
import {FileTypeIcon} from '../../common/uploads/file-type-icon/file-type-icon';
import {IconButton} from '../../common/ui/buttons/icon-button';
import {CloseIcon} from '../../common/icons/material/Close';
import {FileThumbnail} from '../../common/uploads/file-type-icon/file-thumbnail';
import {IllustratedMessage} from '../../common/ui/images/illustrated-message';
import {SvgImage} from '../../common/ui/images/svg-image/svg-image';
import {Button} from '../../common/ui/buttons/button';
import {prettyBytes} from '../../common/uploads/utils/pretty-bytes';
import {FolderIcon} from '../../common/icons/material/Folder';
import {getPathForFolder, RootFolderPage} from '../drive-page/drive-page';
import {GroupsIcon} from '../../common/icons/material/Groups';
import {Avatar} from '../../common/ui/images/avatar';
import {Tooltip} from '../../common/ui/tooltip/tooltip';
import {FormattedDate} from '../../common/i18n/formatted-date';
import {Trans} from '../../common/i18n/trans';
import {DashboardLayoutContext} from '../../common/ui/layout/dashboard-layout-context';
import {useNavigate} from '../../common/utils/hooks/use-navigate';
import detailedExamination from './detailed-examination.svg';
import clsx from 'clsx';

interface DetailsSidebarProps {
  className?: string;
}
export function DetailsSidebar({className}: DetailsSidebarProps) {
  const selectedEntry = useSelectedEntry();
  return (
    <div
      className={clsx(
        className,
        'bg p-24 text-sm text-muted border-l h-full overflow-y-auto'
      )}
    >
      {selectedEntry ? (
        <EntryProperties entry={selectedEntry} />
      ) : (
        <NothingSelected />
      )}
    </div>
  );
}

interface HeaderProps {
  entryType: string;
  entryName: ReactNode;
}
function Header({entryType, entryName}: HeaderProps) {
  const {setRightSidenavStatus} = useContext(DashboardLayoutContext);
  return (
    <div className="flex items-center gap-16 text-text-main mb-38">
      <FileTypeIcon className="w-24 h-24" type={entryType} />
      <div className="text-xl font-normal text-ellipsis flex-auto mr-auto min-w-0 break-words">
        {entryName}
      </div>
      <IconButton
        size="md"
        className="flex-shrink-0"
        onClick={() => {
          setRightSidenavStatus('closed');
        }}
      >
        <CloseIcon />
      </IconButton>
    </div>
  );
}

interface EntryPropertiesProps {
  entry: DriveEntry;
}
function EntryProperties({entry}: EntryPropertiesProps) {
  return (
    <div>
      <Header entryType={entry.type} entryName={entry.name} />
      {entry.type === 'image' && (
        <FileThumbnail className="mb-20" file={entry} />
      )}
      <div>
        <SectionHeader>
          <Trans message="Who has access" />
        </SectionHeader>
        <div className="flex items-center gap-14">
          {entry.workspace_id ? (
            <div className="rounded-full border w-32 h-32 flex items-center justify-center">
              <GroupsIcon className="icon-md" />
            </div>
          ) : null}
          {entry.users.map(user => (
            <Tooltip label={user.display_name} key={user.id}>
              <Avatar src={user.avatar} size="md" circle />
            </Tooltip>
          ))}
        </div>
        {entry.permissions['files.update'] && (
          <Button
            className="block mt-20"
            variant="link"
            color="primary"
            onClick={() => {
              driveState().setActiveActionDialog('share', [entry]);
            }}
          >
            <Trans message="Manage Access" />
          </Button>
        )}
      </div>
      <PropertiesPanel entry={entry} />
    </div>
  );
}

interface SectionHeaderProps {
  children: ReactNode;
}
function SectionHeader({children}: SectionHeaderProps) {
  return <div className="text-base text-main mb-20">{children}</div>;
}

function PropertiesPanel({entry}: EntryPropertiesProps) {
  const parent = useSelectedEntryParent();
  const navigate = useNavigate();
  const owner = entry.users.find(user => user.owns_entry);
  const prettySize = useMemo(
    () => prettyBytes(entry.file_size),
    [entry.file_size]
  );

  return (
    <div className="mt-20 border-t pt-20">
      <SectionHeader>
        <Trans message="Properties" />
      </SectionHeader>
      <PropertyItem
        label={<Trans message="Type" />}
        value={
          <span className="capitalize">
            <Trans message={entry.type} />
          </span>
        }
      />
      <PropertyItem
        label={<Trans message="Size" />}
        value={entry.file_size ? prettySize : '-'}
      />
      <PropertyItem
        label={<Trans message="Location" />}
        value={
          <Button
            variant="link"
            startIcon={<FolderIcon />}
            onClick={() => {
              navigate(
                parent ? getPathForFolder(parent.hash) : RootFolderPage.path
              );
            }}
          >
            {parent ? parent.name : <Trans message="Root" />}
          </Button>
        }
      />
      {owner && (
        <PropertyItem
          label={<Trans message="Owner" />}
          value={owner.display_name}
        />
      )}
      <PropertyItem
        label={<Trans message="Modified" />}
        value={<FormattedDate date={entry.updated_at} />}
      />
      <PropertyItem
        label={<Trans message="Created" />}
        value={<FormattedDate date={entry.updated_at} />}
      />
    </div>
  );
}

interface PropertyItemProps {
  label: ReactNode;
  value: ReactNode;
}
function PropertyItem({label, value}: PropertyItemProps) {
  return (
    <div className="flex items-center mb-14">
      <div className="w-1/3 text-sm text-muted">{label}</div>
      <div className="w-2/3 text-sm text-main">{value}</div>
    </div>
  );
}

function NothingSelected() {
  return (
    <>
      <Header entryType="folder" entryName={<Trans message="All files" />} />
      <IllustratedMessage
        image={<SvgImage src={detailedExamination} />}
        description={
          <Trans message="Select file or folder to see details here" />
        }
      />
    </>
  );
}
