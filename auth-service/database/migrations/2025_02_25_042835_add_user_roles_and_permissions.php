<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Add default roles
        $admin = Role::create([ 'name' => 'admin' ]);
        $user = Role::create([ 'name'=> 'user'] );

        // Add default permissions
        Permission::create([ 'name'=> 'create.ip'] );
        Permission::create([ 'name'=> 'update.ip'] );
        Permission::create([ 'name'=> 'update.own.ip'] );
        Permission::create([ 'name'=> 'update.ip.label'] );
        Permission::create([ 'name'=> 'read.ip'] );
        Permission::create([ 'name'=> 'delete.ip'] );

        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Sync permissions to roles
        $admin->givePermissionTo(Permission::all());

        // Limited permission of the users
        $user->givePermissionTo(permissions: ['create.ip', 'update.own.ip', 'update.ip.label', 'read.ip']);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
