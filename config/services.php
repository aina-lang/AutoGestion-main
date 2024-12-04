<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'resend' => [
        'key' => env('RESEND_KEY'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],
    'cloudinary' => [
        'driver'    => 'cloudinary',
        'cloud_name' => env('CLOUDINARY_CLOUD_NAME', 'dbdrablkd'), // Fallback to 'dbdrablkd'
        'api_key'    => env('CLOUDINARY_API_KEY', '994451142718379'), // Fallback to your key
        'api_secret' => env('CLOUDINARY_API_SECRET', 'hbhz8-GsuZTWGwhv4YWYoKc8hAA'), // Fallback to your secret
        'url'        => env('CLOUDINARY_URL', 'cloudinary://994451142718379:hbhz8-GsuZTWGwhv4YWYoKc8hAA@dbdrablkd'),
    ],

];