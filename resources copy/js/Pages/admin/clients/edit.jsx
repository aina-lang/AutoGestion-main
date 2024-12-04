import MyHeader from '@/Components/Header';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router, useForm } from '@inertiajs/react';
import AddCircle from '@mui/icons-material/AddCircle';
import { Chip, IconButton, TextField } from '@mui/material';
import React, { useState } from 'react';

function EditClient({ client }) {
    const { data, setData, put, processing, errors } = useForm({
        nom: client.nom || '',
        prenoms: client.prenoms || '',
        email: client.email || '',
        password: '',
        phones: JSON.parse(JSON.parse(client.phones)) || [],
        phones_remove: [], // Add this to track phones to remove
    });

    console.log(data.phones);

    const [phoneInput, setPhoneInput] = useState('');

    const submit = (e) => {
        e.preventDefault();

        // Include phones to be removed in the form data
        put(route('clients.update', client.id), data);
    };

    const addPhoneNumber = () => {
        const phonePattern = /^\+?[0-9 ]+$/;

        if (phoneInput.trim() && phonePattern.test(phoneInput.trim())) {
            setData('phones', [...data.phones, phoneInput.trim()]);
            setPhoneInput('');
        } else {
            alert(
                'Veuillez entrer un numéro de téléphone valide (peut contenir des chiffres, des espaces, et un "+" au début).',
            );
        }
    };
    const removePhoneNumber = (phoneToRemove) => {
        // Remove the phone from the current phones array
        setData((prevData) => {
            const updatedPhones = prevData.phones.filter(
                (phone) => phone !== phoneToRemove,
            );

            return {
                ...prevData,
                phones: updatedPhones,
                phones_remove: [...prevData.phones_remove, phoneToRemove], // Track the phone number to be removed
            };
        });

        console.log(data, phoneToRemove); // This may still show the old state due to async nature of setData
    };

    return (
        <AdminLayout
            header={
                <MyHeader
                    title="Gestion des Clients"
                    breadcrumbItems={[
                        { label: 'Accueil', href: '/' },
                        { label: 'Clients', href: '/admin/clients' },
                        { label: 'Modifier' },
                    ]}
                />
            }
        >
            <Head title="Modifier Client" />
            <div className="mx-auto max-w-3xl p-6">
                <h1 className="mb-6 text-2xl font-bold text-gray-800">
                    Modifier Client: {data.nom} {data.prenoms}
                </h1>

                <form
                    onSubmit={submit}
                    className="space-y-6 rounded-lg bg-white p-8 shadow-lg"
                >
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <TextField
                            id="nom"
                            name="nom"
                            value={data.nom}
                            className="w-full"
                            autoComplete="nom"
                            label="Nom"
                            error={!!errors.nom}
                            helperText={errors.nom}
                            onChange={(e) => setData('nom', e.target.value)}
                            required
                        />
                        <TextField
                            id="prenoms"
                            name="prenoms"
                            value={data.prenoms}
                            className="w-full"
                            autoComplete="prenoms"
                            label="Prénoms"
                            error={!!errors.prenoms}
                            helperText={errors.prenoms}
                            onChange={(e) => setData('prenoms', e.target.value)}
                            required
                        />
                        <TextField
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="w-full"
                            autoComplete="username"
                            label="Email"
                            error={!!errors.email}
                            helperText={errors.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />{' '}
                        <TextField
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="w-full"
                            autoComplete="new-password"
                            label="Mot de Passe"
                            error={!!errors.password}
                            helperText={errors.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                        />
                    </div>

                    <div>
                        <InputLabel
                            value="Numéros de téléphone"
                            className="mb-2"
                        />
                        <div className="flex items-center gap-2">
                            <TextField
                                value={phoneInput}
                                onChange={(e) => setPhoneInput(e.target.value)}
                                placeholder="Ajouter un numéro de téléphone"
                                className="flex-grow"
                            />
                            <IconButton
                                onClick={addPhoneNumber}
                                color="primary"
                                aria-label="Ajouter un numéro de téléphone"
                            >
                                <AddCircle />
                            </IconButton>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {data.phones.map((phone, index) => (
                                <Chip
                                    key={index}
                                    label={phone}
                                    onDelete={() => removePhoneNumber(phone)}
                                    className="bg-blue-100 text-blue-800"
                                />
                            ))}
                        </div>
                        {errors.phones && (
                            <InputError
                                message={errors.phones.join(', ')}
                                className="mt-2"
                            />
                        )}
                    </div>

                    <div className="flex justify-start space-x-4">
                        <PrimaryButton type="submit" disabled={processing}>
                            {processing
                                ? 'Enregistrement...'
                                : 'Modifier Client'}
                        </PrimaryButton>
                        <SecondaryButton
                            type="button"
                            onClick={() => router.get('/admin/clients')}
                            className="text-sm text-gray-600 hover:underline"
                        >
                            Annuler
                        </SecondaryButton>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}

export default EditClient;