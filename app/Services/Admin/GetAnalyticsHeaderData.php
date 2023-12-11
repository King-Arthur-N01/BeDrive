<?php

namespace App\Services\Admin;

use App\File;
use App\Folder;
use App\User;
use Common\Admin\Analytics\Actions\GetAnalyticsHeaderDataAction;
use Common\Files\Actions\ValidateFileUpload;

class GetAnalyticsHeaderData implements GetAnalyticsHeaderDataAction
{
    public function __construct(
        private File $file,
        private User $user,
        private Folder $folder
    ) {
    }

    public function execute($channel = null)
    {
        return [
            [
                'icon' => [
                    [
                        'tag' => 'path',
                        'attr' => [
                            'd' =>
                                'M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z',
                        ],
                    ],
                ],
                'name' => __('Total Files'),
                'type' => 'number',
                'value' => number_format($this->file->count()),
            ],
            [
                'icon' => [
                    [
                        'tag' => 'path',
                        'attr' => [
                            'd' =>
                                'M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z',
                        ],
                    ],
                ],
                'name' => __('Total Folders'),
                'type' => 'number',
                'value' => number_format($this->folder->count()),
            ],
            [
                'icon' => [
                    [
                        'tag' => 'path',
                        'attr' => [
                            'd' =>
                                'M9 13.75c-2.34 0-7 1.17-7 3.5V19h14v-1.75c0-2.33-4.66-3.5-7-3.5zM4.34 17c.84-.58 2.87-1.25 4.66-1.25s3.82.67 4.66 1.25H4.34zM9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5 5.5 6.57 5.5 8.5 7.07 12 9 12zm0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7zm7.04 6.81c1.16.84 1.96 1.96 1.96 3.44V19h4v-1.75c0-2.02-3.5-3.17-5.96-3.44zM15 12c1.93 0 3.5-1.57 3.5-3.5S16.93 5 15 5c-.54 0-1.04.13-1.5.35.63.89 1 1.98 1 3.15s-.37 2.26-1 3.15c.46.22.96.35 1.5.35z',
                        ],
                    ],
                ],
                'name' => __('Total Users'),
                'type' => 'number',
                'value' => number_format($this->user->count()),
            ],
            [
                'icon' => [
                    [
                        'tag' => 'path',
                        'attr' => [
                            'd' =>
                                'M2 20h20v-4H2v4zm2-3h2v2H4v-2zM2 4v4h20V4H2zm4 3H4V5h2v2zm-4 7h20v-4H2v4zm2-3h2v2H4v-2z',
                        ],
                    ],
                ],
                'name' => __('Total Space Used'),
                'type' => 'fileSize',
                'value' => ValidateFileUpload::formatBytes(
                    (int) $this->file->sum('file_size'),
                ),
            ],
        ];
    }
}
