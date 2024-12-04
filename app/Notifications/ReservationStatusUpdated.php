<?php

namespace App\Notifications;

use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Messages\VonageMessage;
use Illuminate\Notifications\Notification;

class ReservationStatusUpdated extends Notification
{
    use Queueable;

    protected $reservation;
    protected $status;

    public function __construct($reservation, $status)
    {
        $this->reservation = $reservation;
        $this->status = $status;
    }

    public function via($notifiable)
    {
        return [
            // 'vonage',

            'mail'
        ];
    }

    public function toMail($notifiable)
    {
        $mailMessage = (new MailMessage)
            ->greeting('Bonjour ' . $notifiable->nom);

        switch ($this->status) {
            case 'confirmée':
                $mailMessage->subject('Confirmation de votre réservation')
                    ->line('Nous avons le plaisir de vous informer que votre réservation pour le véhicule prévu à la date indiquée a été confirmée par Vezo Tours.')
                    ->line('Nous vous invitons à vous rendre à l’agence afin de procéder à la prise en charge du véhicule.')
                    ->line('Nous vous remercions pour votre confiance et restons à votre disposition pour toute information complémentaire.')
                    ->line('Véhicule : ' . $this->reservation->vehicule->marque . ' ' . $this->reservation->vehicule->modele)
                    ->line('Date de départ : ' . Carbon::parse($this->reservation->date_depart)->format('d/m/Y'))
                    ->line('Date de retour : ' . Carbon::parse($this->reservation->date_retour)->format('d/m/Y'))
                    ->line('Motif du voyage : ' . $this->reservation->motif)
                    ->line('Type de voyage : ' . ucfirst($this->reservation->type_voyage));
                break;

            case 'en attente':
                $mailMessage->subject('Mise à jour de votre réservation')
                    ->line('Nous sommes navrés de vous informer que votre réservation a été mise en attente pour le moment.')
                    ->line('Statut actuel : ' . ucfirst($this->status))
                    ->line('Nous vous tiendrons informé dès que de nouvelles informations seront disponibles. Merci pour votre patience et votre compréhension.')
                    ->line('Véhicule : ' . $this->reservation->vehicule->marque . ' ' . $this->reservation->vehicule->modele)
                    ->line('Date de départ : ' . Carbon::parse($this->reservation->date_depart)->format('d/m/Y'))
                    ->line('Date de retour : ' . Carbon::parse($this->reservation->date_retour)->format('d/m/Y'))
                    ->line('Motif du voyage : ' . $this->reservation->motif)
                    ->line('Type de voyage : ' . ucfirst($this->reservation->type_voyage));
                break;

            case 'annulée':
                $mailMessage->subject('Annulation de votre réservation')
                    ->line('Nous sommes navrés de vous informer que votre réservation a été annulée.')
                    ->line('Véhicule : ' . $this->reservation->vehicule->marque . ' ' . $this->reservation->vehicule->modele)
                    ->line('Date de départ : ' . Carbon::parse($this->reservation->date_depart)->format('d/m/Y'))
                    ->line('Date de retour : ' . Carbon::parse($this->reservation->date_retour)->format('d/m/Y'))
                    ->line('Nous vous remercions pour votre compréhension.');
                break;

            default:
                $mailMessage->subject('Mise à jour de votre réservation')
                    ->line('Le statut de votre réservation a été mis à jour.')
                    ->line('Statut actuel : ' . ucfirst($this->status))
                    ->line('Véhicule : ' . $this->reservation->vehicule->marque . ' ' . $this->reservation->vehicule->modele)
                    ->line('Date de départ : ' . Carbon::parse($this->reservation->date_depart)->format('d/m/Y'))
                    ->line('Date de retour : ' . Carbon::parse($this->reservation->date_retour)->format('d/m/Y'));
                break;
        }

        return $mailMessage
            ->action('Voir votre réservation', url('/reservations/' . $this->reservation->id))
            ->line('Merci d\'avoir choisi Vezo Tours!');
    }

    public function toVonage($notifiable)
    {
        $messageContent = '';

        switch ($this->status) {
            case 'confirmée':
                $messageContent = "Votre réservation pour le véhicule {$this->reservation->vehicule->marque} a été confirmée. Merci pour votre confiance et bonne route !";
                break;

            case 'en attente':
                $messageContent = "Votre réservation pour le véhicule {$this->reservation->vehicule->marque} est en attente. Nous vous tiendrons informé dès qu'une mise à jour sera effectuée.";
                break;

            default:
                $messageContent = "Le statut de votre réservation pour le véhicule {$this->reservation->vehicule->marque} a été mis à jour. Statut actuel : " . ucfirst($this->status);
                break;
        }

        return (new VonageMessage())
            ->content($messageContent)
            ->from(env('VONAGE_SMS_FROM'))
            ->unicode();
    }
}
