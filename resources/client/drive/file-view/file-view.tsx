import React, {
  MouseEventHandler,
  ReactNode,
  useContext,
  useRef,
  useState,
} from 'react';
import {usePaginatedEntries} from '../files/queries/use-paginated-entries';
import {driveState, useDriveStore} from '../drive-store';
import {IllustratedMessage} from '../../common/ui/images/illustrated-message';
import {SvgImage} from '../../common/ui/images/svg-image/svg-image';
import {SearchFilterList} from '../search/search-filter-list';
import {Trans} from '../../common/i18n/trans';
import {useMouseSelectionBox} from '../../common/ui/interactions/dnd/mouse-selection/use-mouse-selection-box';
import {useDroppable} from '../../common/ui/interactions/dnd/use-droppable';
import {mergeProps} from '@react-aria/utils';
import {useDriveUploadQueue} from '../uploading/use-drive-upload-queue';
import {EntryActionList} from '../entry-actions/entry-action-list';
import {DriveContextMenu} from '../files/drive-context-menu';
import {FileTable} from './file-table/file-table';
import {FileGrid} from './file-grid/file-grid';
import {DriveSortButton} from '../layout/sorting/drive-sort-button';
import {DashboardLayoutContext} from '../../common/ui/layout/dashboard-layout-context';
import {PageBreadcrumbs} from '../page-breadcrumbs';
import {InfiniteScrollSentinel} from '../../common/ui/infinite-scroll/infinite-scroll-sentinel';
import {useEntries} from '../files/queries/use-entries';
import {AdHost} from '../../common/admin/ads/ad-host';
import {DropTargetMask} from '../drop-target-mask';
import {useSearchParams} from 'react-router-dom';
import clsx from 'clsx';
import {MixedDraggable} from '../../common/ui/interactions/dnd/use-draggable';

interface FileViewProps {
  className?: string;
}
export function FileView({className}: FileViewProps) {
  const [params] = useSearchParams();
  const isSearchingOrFiltering =
    !!params.get('query') || !!params.get('filters');
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isLoading,
    fetchStatus,
  } = usePaginatedEntries();
  const entries = useEntries();
  const {uploadFiles} = useDriveUploadQueue();
  const activePage = useDriveStore(s => s.activePage);
  const [isDragOver, setIsDragOver] = useState(false);
  const viewMode = useDriveStore(s => s.viewMode);
  const {isMobileMode} = useContext(DashboardLayoutContext);

  const {containerProps, boxProps} = useMouseSelectionBox({
    containerRef,
    onPointerDown: e => {
      if (!(e.target as HTMLElement).closest('.entry-action-list')) {
        driveState().deselectEntries('all');
      }
    },
  });

  const {droppableProps} = useDroppable({
    id: 'driveRoot',
    ref: containerRef,
    types: ['nativeFile'],
    onDragEnter: () => {
      setIsDragOver(true);
    },
    onDragLeave: () => {
      setIsDragOver(false);
    },
    onDrop: async (draggable: MixedDraggable) => {
      if (draggable.type === 'nativeFile') {
        uploadFiles(await draggable.getData());
      }
    },
  });

  if (!activePage) return null;

  let content: ReactNode;
  if (!entries.length && (!isLoading || fetchStatus === 'idle')) {
    const noContentMessage = activePage.noContentMessage(
      isSearchingOrFiltering
    );
    content = (
      <IllustratedMessage
        className="mt-40"
        image={<SvgImage src={noContentMessage.image} />}
        title={<Trans {...noContentMessage.title} />}
        description={<Trans {...noContentMessage.description} />}
      />
    );
  } else if (!isLoading) {
    content =
      viewMode === 'list' ? (
        <FileTable entries={entries} />
      ) : (
        <FileGrid entries={entries} />
      );
  }

  const handleContextMenu: MouseEventHandler = e => {
    e.preventDefault();
    e.stopPropagation();
    driveState().deselectEntries('all');
    driveState().setContextMenuData({x: e.clientX, y: e.clientY});
  };

  return (
    <div
      className={clsx('relative', className)}
      {...mergeProps(containerProps, droppableProps)}
      onContextMenu={handleContextMenu}
    >
      <div className="flex flex-col relative pt-10 min-h-full">
        {isMobileMode ? (
          <PageBreadcrumbs className="px-14 mb-10" />
        ) : (
          <Toolbar />
        )}
        <SearchFilterList />
        <div className="px-18 md:px-24 pb-18 flex-auto relative">
          <AdHost slot="drive" className="mb-24" />
          {content}
          <InfiniteScrollSentinel
            onIntersection={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
            hasNextPage={hasNextPage}
          />
        </div>
        <div
          {...boxProps}
          className="absolute bg-primary-light/20 border border-primary-light z-10 pointer-events-none shadow-md left-0 top-0 hidden"
        />
        <DriveContextMenu />
        <DropTargetMask isVisible={isDragOver} />
      </div>
    </div>
  );
}

function Toolbar() {
  const activePage = useDriveStore(s => s.activePage);
  return (
    <div className="px-10 md:px-18 my-10 flex items-center gap-40 justify-between text-muted min-h-42">
      <DriveSortButton isDisabled={activePage?.disableSort} />
      <EntryActionList className="text-muted" />
    </div>
  );
}
