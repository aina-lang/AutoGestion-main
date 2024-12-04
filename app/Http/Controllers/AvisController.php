<?php

// app/Http/Controllers/AvisController.php

namespace App\Http\Controllers;

use App\Models\Avis;
use App\Models\Vehicule;
use App\Traits\BulkAction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Exception;

class AvisController extends Controller
{
    use BulkAction;

    /**
     * Add a new review for a vehicle
     *
     * @param \Illuminate\Http\Request $request
     * @param int $vehiculeId
     * @return \Illuminate\Http\RedirectResponse|\Inertia\Response
     */
    public function store(Request $request, $vehiculeId)
    {
        try {
            // Validate the request
            $request->validate([
                'note' => 'required|integer|between:1,5',
                'commentaire' => 'required|string|max:1000',
            ]);

            // Check if the user has already left a review for this vehicle
            if (!Avis::userHasReviewForVehicle(Auth::id(), $vehiculeId)) {
                $vehicule = Vehicule::findOrFail($vehiculeId);
                Avis::create([
                    'vehicule_id' => $vehicule->id,
                    'user_id' => Auth::id(),
                    'note' => $request->note,
                    'commentaire' => $request->commentaire,
                ]);
                // Redirect back with success message
                return redirect()->back()->with('success', 'Avis ajouté avec succès');
            }

            // If the user has already left a review for the vehicle, show an error
            return redirect()->back()->with('error', 'Vous avez déjà laissé un avis pour ce véhicule.');
        } catch (Exception $e) {
            // Handle any exceptions and show an error message
            return Inertia::render('Avis/Create', [
                'error' => 'Une erreur est survenue lors de l\'ajout de l\'avis. Veuillez réessayer.',
                'vehiculeId' => $vehiculeId,
            ]);
        }
    }

    /**
     * Update an existing review
     *
     * @param \Illuminate\Http\Request $request
     * @param int $vehiculeId
     * @param int $avisId
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request, $vehiculeId, $avisId)
    {
        try {
            // Validate the request
            $request->validate([
                'note' => 'required|integer|between:1,5',
                'commentaire' => 'required|string|max:1000',
            ]);

            $avis = Avis::where('vehicule_id', $vehiculeId)
                ->where('id', $avisId)
                ->where('user_id', Auth::id())
                ->firstOrFail();

            // Update the review
            $avis->update([
                'note' => $request->note,
                'commentaire' => $request->commentaire,
            ]);

            // Redirect back with success message
            return redirect()->back()
                ->with('success', 'Avis mis à jour avec succès');
        } catch (Exception $e) {
            // Handle any exceptions and show an error message
            return redirect()->back()
                ->with('error', 'Une erreur est survenue lors de la mise à jour de l\'avis. Veuillez réessayer.'.$e->getMessage());
        }
    }

    /**
     * Delete a review
     *
     * @param int $vehiculeId
     * @param int $avisId
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy($vehiculeId, $avisId)
    {
        try {
            $avis = Avis::where('vehicule_id', $vehiculeId)
                ->where('id', $avisId)
                ->where('user_id', Auth::id())
                ->firstOrFail();

            // Delete the review
            $avis->delete();

            // Redirect back with success message
            return redirect()->back()->with('success', 'Avis supprimé avec succès');
        } catch (Exception $e) {
            // Handle any exceptions and show an error message
            return redirect()->back()->with('error', 'Une erreur est survenue lors de la suppression de l\'avis. Veuillez réessayer.');
        }
    }

    /**
     * Handle bulk deletion of reviews
     *
     * @param \Illuminate\Http\Request $request
     * @return mixed
     */
    public function bulkDelete(Request $request)
    {
        // Validate the request to make sure an array of IDs is passed
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:avis,id',
        ]);

        return $this->bulkDeleteMany($request, Avis::class);
    }
}
