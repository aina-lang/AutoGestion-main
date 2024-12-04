<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Détails de la Réservation</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f9f9f9;
            color: #333;
        }

        @page {
            size: A4;
            margin: 0;
        }

        h1 {
            text-align: center;
            color: #2c3e50;
            font-size: 2.5em;
            margin-bottom: 30px;
            font-weight: 600;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 50px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        th,
        td {
            padding: 18px;
            text-align: left;
            font-size: 1.1em;
            border-bottom: 1px solid #ddd;
        }

        th {
            background-color: #f2f2f2;
            color: #2c3e50;
            text-transform: uppercase;
            font-weight: 600;
        }

        td {
            font-size: 1.1em;
        }

        .highlight {
            font-weight: bold;
            color: #e74c3c;
        }

        .note {
            color: #7f8c8d;
            font-style: italic;
        }

        .footer {
            text-align: center;
            margin-top: 40px;
            font-size: 0.9em;
            color: #7f8c8d;
            position: absolute;
            bottom: 20px;
            left: 0;
            right: 0;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 50px;
            border-bottom: 2px solid #2c3e50;
            padding-bottom: 20px;
        }

        .header img {
            width: 120px;
            height: auto;
        }

        .header .agency-name {
            font-size: 1.6em;
            color: #2c3e50;
            font-weight: bold;
        }

        .reservation-info {
            margin-top: 40px;
            text-align: center;
            color: #34495e;
            font-size: 1.3em;
        }

        .status {
            font-weight: bold;
            font-size: 1.1em;
        }

        .status-confirmed {
            color: green;
        }

        .status-pending {
            color: orange;
        }

        .status-cancelled {
            color: red;
        }

    </style>
</head>

<?php
$dateDebut = new DateTime($reservation->date_depart);
$dateRetour = new DateTime($reservation->date_retour);

// Calcul de la différence
$interval = $dateDebut->diff($dateRetour);

// Nombre de jours
$nombreDeJours = $interval->days;
?>

<body>

    <!-- En-tête avec logo et nom de l'agence -->
    <div class="header">
        {{-- <img src="{{asset('assets/logo.png')}}" alt="Logo de l'agence"> --}}
        <div class="agency-name">{{ config('app.name', 'Vezo Tours') }}</div>
    </div>

    <!-- Titre principal de la réservation -->
    <h1>Détails de votre Réservation</h1>

    <!-- Message d'introduction -->
    <p class="reservation-info">Merci d'avoir choisi notre service. Voici un résumé complet des informations liées à votre réservation.</p>

    <!-- Tableau des informations de réservation -->
    <table>
        <tr>
            <th>Nom du Client</th>
            <td>{{ $reservation->user->nom . ' ' . $reservation->user->prenoms }}</td>
        </tr>
        <tr>
            <th>Véhicule Réservé</th>
            <td>{{ $reservation->vehicule->marque }} - <span class="note">{{ $reservation->vehicule->modele }}</span></td>
        </tr>
        <tr>
            <th>Date de Début de Location</th>
            <td>{{ $reservation->date_depart }}</td>
        </tr>
        <tr>
            <th>Date de Retour Prévue</th>
            <td>{{ $reservation->date_retour }}</td>
        </tr>
        <tr>
            <th>Durée de la Réservation</th>
            <td class="highlight">{{ $nombreDeJours }} jours</td>
        </tr>
        <tr>
            <th>Statut de la Réservation</th>
            <td>
                @if ($reservation->status == 'confirmée')
                    <span class="status status-confirmed">Confirmation réussie</span>
                @elseif ($reservation->status == 'en attente')
                    <span class="status status-pending">En attente de confirmation</span>
                @else
                    <span class="status status-cancelled">Réservation annulée</span>
                @endif
            </td>
        </tr>
    </table>

    <!-- Footer avec contact et message de remerciement -->
    <div class="footer">
        <p>Pour toute question ou modification de votre réservation, veuillez nous contacter</p>
        <p>Merci de votre confiance, nous vous souhaitons une expérience agréable!</p>
    </div>

</body>

</html>
