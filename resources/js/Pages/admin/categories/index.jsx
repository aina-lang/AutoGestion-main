import BreadCumbHeader from '@/Components/BreadCumbHeader';
import MyHeader from '@/Components/Header';
import StyledDataGrid from '@/Components/StyledDataGrid';

import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import { MoreHorizSharp } from '@mui/icons-material';
import { Grid } from '@mui/material';
import React, { useState } from 'react';

function Index({ categories }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [gridView, setGridView] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    console.log(categories);
    // Toggle between grid and table view
    const toggleGridView = () => {
        setItemsPerPage(gridView ? 5 : 8);
        setGridView(!gridView);
    };

    const filteredCategories = categories.data.filter((category) =>
        category.nom.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const paginatedCategories = filteredCategories.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage,
    );

    return (
        <AdminLayout
            breadcrumbHeader={
                <BreadCumbHeader
                    breadcrumbItems={[
                        { label: 'Véhicules', href: '/admin/vehicules/' },
                        { label: 'Catégories' },
                    ]}
                />
            }
            header={
                <MyHeader
                    title="Véhicules et Catégories"
                    breadcrumbItems={[
                        { label: 'Accueil', href: '/' },
                        { label: 'Véhicules' },
                    ]}
                    right={
                        <div className="flex w-full justify-between space-x-4">
                            <div className="rounded-lg">
                                <h2 className="mb-4 text-2xl font-bold text-gray-800">
                                    Liste des catégories 
                                </h2>
                            </div>
                            {/* <button onClick={toggleGridView}>
                                {gridView ? (
                                    <GridIcon
                                        size={35}
                                        className="text-gray-500"
                                    />
                                ) : (
                                    <TableView
                                        fontSize="large"
                                        className="text-gray-500"
                                    />
                                )}
                            </button> */}
                            {/* <div className="flex items-center overflow-hidden rounded-md border bg-gray-50 pr-2 dark:bg-gray-800">
                                <Input
                                    className="focus: border-none bg-gray-50 p-2 dark:bg-gray-800"
                                    placeholder="Rechercher une catégorie..."
                                    value={searchQuery}
                                    onChange={(e) =>
                                        setSearchQuery(e.target.value)
                                    }
                                />
                                <SearchIcon size={20} />
                            </div> */}
                            {/* <PrimaryButton
                                onClick={() =>
                                    router.get('/admin/categories/create')
                                }
                            >
                                <GridAddIcon />
                                Nouveau Véhicule
                            </PrimaryButton> */}
                        </div>
                    }
                />
            }
        >
            <Head title="Véhicules et Catégories" />
            <div className="mx-auto space-y-5 p-6 pt-0">
                {gridView ? (
                    <Grid container spacing={2}>
                        {paginatedCategories.map((categorie, index) => (
                            <Grid item xs={12} sm={6} key={index}>
                                <div className="flex flex-col rounded-lg bg-white p-4 shadow dark:bg-gray-800 dark:text-gray-300">
                                    <div className="mb-4 flex items-start justify-between">
                                        <h4 className="text-lg font-semibold">
                                            {categorie.nom}
                                        </h4>
                                        <button className="bg-transparent p-0 shadow-none">
                                            <MoreHorizSharp className="text-gray-500" />
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-700 dark:text-gray-400">
                                        {categorie.description}
                                    </p>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <StyledDataGrid
                        data={categories}
                        columns={[
                            { accessorKey: 'nom', header: 'Libellé' },
                            {
                                accessorKey: 'description',
                                header: 'Description',
                            },
                        ]}
                        // filterableColumns={['motif', 'label', 'assignedTo']}
                        actionUrl={route(route().current())}
                        // pdfUrl={'vehicule.pdf'}
                        pdfBtnShown={false}
                    />
                )}
            </div>
        </AdminLayout>
    );
}

export default Index;
