<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    public function run(): void
    {
        $services = [
            [
                'name' => 'In-Person Consultation',
                'name_ar' => 'حضوري',
                'description' => 'Face-to-face consultation at our office',
                'description_ar' => 'استشارة حضورية في مكتبنا',
                'price' => 575.00,
                'duration' => '30 دقيقة',
                'icon' => '🏢',
                'type' => 'in-person',
                'is_active' => true,
                'sort_order' => 1,
            ],
            [
                'name' => 'Online Consultation',
                'name_ar' => 'عن بعد',
                'description' => 'Video call consultation from anywhere',
                'description_ar' => 'استشارة عبر مكالمة فيديو من أي مكان',
                'price' => 375.00,
                'duration' => '30 دقيقة',
                'icon' => '💻',
                'type' => 'online',
                'is_active' => true,
                'sort_order' => 2,
            ],
            [
                'name' => 'Phone Consultation',
                'name_ar' => 'مكالمة',
                'description' => 'Quick phone consultation',
                'description_ar' => 'استشارة سريعة عبر الهاتف',
                'price' => 279.00,
                'duration' => '-',
                'icon' => '📞',
                'type' => 'phone',
                'is_active' => true,
                'sort_order' => 3,
            ],
        ];

        foreach ($services as $service) {
            Service::firstOrCreate(
                ['type' => $service['type']],
                $service
            );
        }
    }
}
