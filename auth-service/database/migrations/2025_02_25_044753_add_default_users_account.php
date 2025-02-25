<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        /**
         * Create a default Admin account
         */
        $admin = User::create([
            'id' => Str::uuid(),
            'name' => 'IP Admin',
            'email'=> 'ipadmin@domain.com',
            'password' => bcrypt('password'),
        ]);

        $user = User::create([
            'id' => Str::uuid(),
            'name' => 'IP User',
            'email'=> 'ipuser@domain.com',
            'password' => bcrypt('password'),
        ]);

        $admin->assignRole('admin');
        $user->assignRole('user');

        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
