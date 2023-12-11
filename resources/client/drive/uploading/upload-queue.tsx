import {ReactElement} from 'react';
import {AnimatePresence, m} from 'framer-motion';
import {driveState, useDriveStore} from '../drive-store';
import {IconButton} from '../../common/ui/buttons/icon-button';
import {CloseIcon} from '../../common/icons/material/Close';
import {useFileUploadStore} from '../../common/uploads/uploader/file-upload-provider';
import {Trans} from '../../common/i18n/trans';
import {UploadQueueItem} from './upload-queue-item';

export function UploadQueue() {
  const isOpen = useDriveStore(s => s.uploadQueueIsOpen);

  return (
    <AnimatePresence>
      {isOpen && (
        <m.div
          key="upload-queue"
          className="shadow-xl rounded fixed bottom-16 right-16 bg z-modal border w-375 text-sm"
          initial={{y: '100%', opacity: 0}}
          animate={{y: 0, opacity: 1}}
          exit={{y: '100%', opacity: 0}}
        >
          <Header />
          <div className="max-h-320 overflow-y-auto">
            <UploadList />
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

export function Header() {
  const inProgressUploadsCount = useFileUploadStore(
    s => s.inProgressUploadsCount
  );
  const completedUploadsCount = useFileUploadStore(
    s => s.completedUploadsCount
  );
  const clearInactive = useFileUploadStore(s => s.clearInactive);

  let message: ReactElement;
  if (inProgressUploadsCount) {
    message = (
      <Trans
        message="Uploading :count files"
        values={{count: inProgressUploadsCount}}
      />
    );
  } else if (completedUploadsCount) {
    message = (
      <Trans
        message="Uploaded :count files"
        values={{count: completedUploadsCount}}
      />
    );
  } else {
    message = <Trans message="No active uploads" />;
  }

  // only allow closing upload queue if there are no active uploads
  return (
    <div className="px-10 py-4 bg-alt flex items-center gap-10 justify-between border-b min-h-[45px]">
      {message}
      {inProgressUploadsCount === 0 ? (
        <IconButton
          size="sm"
          onClick={() => {
            driveState().setUploadQueueIsOpen(false);
            // wait for upload queue panel animation to complete, then clear inactive uploads
            setTimeout(() => {
              clearInactive();
            }, 200);
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : undefined}
    </div>
  );
}

function UploadList() {
  const uploads = useFileUploadStore(s => s.fileUploads);
  return (
    <>
      {[...uploads.values()].map(upload => {
        return <UploadQueueItem key={upload.file.id} file={upload.file} />;
      })}
    </>
  );
}
