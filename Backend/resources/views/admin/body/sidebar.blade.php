<aside class="main-sidebar sidebar-dark-primary elevation-4">
    <!-- Brand Logo -->
    <a href="index3.html" class="brand-link">
      <img src="{{ asset('admin/dist/img/AdminLTELogo.png') }}" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
      <span class="brand-text font-weight-light">AdminLTE 3</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="{{ asset('admin/dist/img/user2-160x160.jpg') }}" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
          <a href="#" class="d-block">{{ Auth::User()->name }}</a>
        </div>
      </div>

      <!-- SidebarSearch Form -->
      

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
          <li class="nav-item">
            <a href="{{route('dashboard')}}" class="nav-link {{ Route::is('dashboard') ? 'active' : ''}}">
              <i class="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Dashboard
                
              </p>
            </a>
            
          </li>
          
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-copy"></i>
              <p>
                Categories
                <i class="fas fa-angle-left right"></i>
                
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="{{ route('add.category') }}" class="nav-link {{ Route::is('add.category') ? 'active' : ''}}">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Add Categories</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="{{ route('categories') }}" class="nav-link {{ Route::is('categories') ? 'active' : ''}}">
                  <i class="far fa-circle nav-icon"></i>
                  <p>All Categories</p>
                </a>
              </li>
              
            </ul>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-copy"></i>
              <p>
                Sub Categories
                <i class="fas fa-angle-left right"></i>
                
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="{{ route('add.subcategory') }}" class="nav-link {{ Route::is('add.subcategory') ? 'active' : ''}}">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Add SubCategories</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="{{ route('subcategories') }}" class="nav-link {{ Route::is('subcategories') ? 'active' : ''}}">
                  <i class="far fa-circle nav-icon"></i>
                  <p>All SubCategories</p>
                </a>
              </li>
              
            </ul>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-copy"></i>
              <p>
                Products
                <i class="fas fa-angle-left right"></i>
                
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="{{ route('add.product') }}" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Add Products</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="{{ route('product') }}" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>All Products</p>
                </a>
              </li>
              
            </ul>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-copy"></i>
              <p>
                Colors & Size
                <i class="fas fa-angle-left right"></i>
                
              </p>
            </a>
            <ul class="nav nav-treeview">
              
              <li class="nav-item">
                <a href="{{ route('colors') }}" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>All Colors</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="{{ route('size') }}" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>All Size</p>
                </a>
              </li>
              
            </ul>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-copy"></i>
              <p>
                Countries
                <i class="fas fa-angle-left right"></i>
                
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="{{ route('add.country') }}" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Add Country</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="{{ route('countries') }}" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>All Country</p>
                </a>
              </li>
              
            </ul>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-copy"></i>
              <p>
                States
                <i class="fas fa-angle-left right"></i>
                
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="{{ route('add.state') }}" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Add State</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="{{ route('state') }}" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>All States</p>
                </a>
              </li>
              
            </ul>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link">
              <i class="nav-icon fas fa-copy"></i>
              <p>
                Cities
                <i class="fas fa-angle-left right"></i>
                
              </p>
            </a>
            <ul class="nav nav-treeview">
              <li class="nav-item">
                <a href="{{ route('add.city') }}" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>Add City</p>
                </a>
              </li>
              <li class="nav-item">
                <a href="{{ route('city') }}" class="nav-link">
                  <i class="far fa-circle nav-icon"></i>
                  <p>All City</p>
                </a>
              </li>
              
            </ul>
          </li>
          
        </ul>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>