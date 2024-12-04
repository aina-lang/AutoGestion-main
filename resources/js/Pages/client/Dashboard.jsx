import MyHeader from '@/Components/Header';
import ClientLayout from '@/Layouts/ClientLayout';
import { Head } from '@inertiajs/react';
import { CarRentalSharp } from '@mui/icons-material';

const chartSetting = {
    yAxis: [
        {
            label: 'rainfall (mm)',
        },
    ],
    width: 400,
    height: 300,
};

const valueFormatter = (value) => `${value} unités`;

export default function Dashboard({
    totalCars,
    userPastReservations,
    totalUsers,
    rentedCarsPercentage,
    availableCarsPercentage,
    monthlyData,
    mostRentedCars,
    upcomingReservations,
    confirmedReservations, // Nouvelle donnée pour les réservations confirmées
}) {
    console.log(route(route().current()));
    return (
        <ClientLayout
            header={<MyHeader title="Tableau de Bord" breadcrumbItems={[]} />}
        >
            <Head title="Tableau de Bord" />

            <div className="flex-grow p-4 text-gray-500">
                {/* Section des Cartes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-2">
                    <Card
                        title="Total de Réservations Passées"
                        value={userPastReservations} // Total des réservations passées
                        icon={<CarRentalSharp className="text-white" />}
                        color="bg-gradient-to-tr from-green-500 to-green-300 shadow-green-200 shadow-lg dark:shadow-black/30"
                    />
                    <Card
                        title="Réservations Confirmées"
                        value={confirmedReservations} // Total des réservations confirmées
                        icon={<CarRentalSharp className="text-white" />}
                        color="bg-gradient-to-tr from-yellow-500 to-yellow-300 shadow-yellow-200 shadow-lg dark:shadow-black/30"
                    />
                </div>
            </div>
        </ClientLayout>
    );
}

const Card = ({ title, value, icon, color }) => (
    <div
        className={`relative space-x-4 rounded-lg bg-white p-4 py-8 pt-2 shadow-lg dark:bg-gray-800`}
    >
        <div
            className={`-top-5 h-16 w-16 ${color} absolute flex items-center justify-center rounded-xl`}
        >
            {icon}
        </div>
        <div className="flex justify-between text-3xl">
            <div className="flex-grow text-right">
                <h6 className="text-lg font-semibold">{title}</h6>
                <p className="text-3xl font-bold text-gray-600">{value}</p>
            </div>
        </div>
    </div>
);

const ChartCard = ({ title, chart }) => (
    <div className="w-2/3 rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800">
        <h6 className="mb-4 text-lg font-semibold">{title}</h6>
        {chart}
    </div>
);
