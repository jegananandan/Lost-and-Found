import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { itemsApi } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import {
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Package,
  FileText,
  MapPin,
  Check,
  Building
} from 'lucide-react';

export const ReportFoundPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [createdItemId, setCreatedItemId] = useState('');

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Bags');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [location, setLocation] = useState('');
  const [reportedDate, setReportedDate] = useState(new Date().toISOString().split('T')[0]);
  const [foundLocation, setFoundLocation] = useState('');
  const [storedAt, setStoredAt] = useState('Central Security Desk');
  const [reporterName, setReporterName] = useState(user?.name || '');
  const [reporterContact, setReporterContact] = useState(user?.phone || '');

  const categories = [
    'Electronics', 'Bags', 'Books', 'Documents', 'Keys', 'Accessories', 'Clothing', 'Other'
  ];

  const handleNext = () => {
    setError('');
    if (step === 1) {
      if (!name.trim()) {
        setError('Please enter the item name.');
        return;
      }
    } else if (step === 2) {
      if (!description.trim()) {
        setError('Please provide a short description.');
        return;
      }
    } else if (step === 3) {
      if (!location.trim()) {
        setError('Please enter the general area where it was found.');
        return;
      }
      if (!storedAt.trim()) {
        setError('Please specify where the item is currently stored.');
        return;
      }
      if (!reporterName.trim() || !reporterContact.trim()) {
        setError('Please enter your contact details.');
        return;
      }
    }
    setStep(step + 1);
  };

  const handlePrev = () => {
    setError('');
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await itemsApi.createItem({
        type: 'FOUND',
        name: name.trim(),
        category,
        description: description.trim(),
        location: location.trim(),
        reportedDate,
        reporterName: reporterName.trim(),
        reporterContact: reporterContact.trim(),
        extraField1: foundLocation.trim(),
        extraField2: storedAt.trim(),
        imageUrl: imageUrl.trim() || undefined,
      });

      setLoading(false);
      setSuccess(true);
      setCreatedItemId(response.data.itemId);
    } catch (err: any) {
      setLoading(false);
      setError(err.response?.data?.message || 'Failed to submit found item report.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-6">
      
      {/* Page Title */}
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Report a Found Item</h1>
        <p className="text-slate-500 text-sm">
          Return what you've found on campus. Help reunite someone with their property.
        </p>
      </div>

      {/* Wizard Steps Progress Indicator */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-xs">
        {[
          { num: 1, label: 'Item Name' },
          { num: 2, label: 'Details' },
          { num: 3, label: 'Location' },
          { num: 4, label: 'Review' },
        ].map((s) => (
          <div key={s.num} className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                step > s.num
                  ? 'bg-emerald-600 text-white'
                  : step === s.num
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-400'
              }`}
            >
              {step > s.num ? <Check className="w-4 h-4" /> : s.num}
            </div>
            <span className={`text-xs font-medium hidden sm:inline ${step === s.num ? 'text-slate-900 font-semibold' : 'text-slate-400'}`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {error && (
        <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Success State */}
      {success ? (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">✓ Found item reported successfully</h2>
          <p className="text-slate-600 text-sm max-w-md mx-auto">
            Record ID: <span className="font-mono font-bold text-slate-900">{createdItemId}</span>. Thank you for helping return lost property. Students can now view this item and submit claim requests.
          </p>
          <div className="flex justify-center gap-3 pt-4">
            <button onClick={() => navigate('/dashboard')} className="btn-secondary text-sm">
              Go to Dashboard
            </button>
            <button onClick={() => navigate(`/items/${createdItemId}`)} className="btn-primary text-sm">
              View Published Found Report
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md space-y-6">
          
          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-lg border-b border-slate-100 pb-3">
                <Package className="w-5 h-5 text-emerald-600" />
                Step 1: What did you find?
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Item Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Black Leather Wallet with ID Cards"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-lg border-b border-slate-100 pb-3">
                <FileText className="w-5 h-5 text-emerald-600" />
                Step 2: Tell us more
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description *</label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe appearance, condition, key details (do not reveal secret verification details)..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Photo Image URL (Optional)</label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/... or image link"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-lg border-b border-slate-100 pb-3">
                <MapPin className="w-5 h-5 text-emerald-600" />
                Step 3: Where and when?
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">General Area Found *</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Student Canteen, Main Auditorium, Sports Complex"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Exact Location Found</label>
                <input
                  type="text"
                  value={foundLocation}
                  onChange={(e) => setFoundLocation(e.target.value)}
                  placeholder="e.g. Near cash counter table 4"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Item Currently Stored At *</label>
                <input
                  type="text"
                  required
                  value={storedAt}
                  onChange={(e) => setStoredAt(e.target.value)}
                  placeholder="e.g. Central Security Desk, Admin Office Desk 2"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={reporterName}
                    onChange={(e) => setReporterName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Contact Phone (10 digits) *</label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={reporterContact}
                    onChange={(e) => setReporterContact(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: REVIEW */}
          {step === 4 && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-lg border-b border-slate-100 pb-3">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                Step 4: Review your report
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3 text-sm">
                <div className="flex justify-between border-b border-slate-200/60 pb-2">
                  <span className="text-slate-500">Item Name:</span>
                  <span className="font-bold text-slate-900">{name}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/60 pb-2">
                  <span className="text-slate-500">Category:</span>
                  <span className="font-semibold text-slate-800">{category}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/60 pb-2">
                  <span className="text-slate-500">General Area:</span>
                  <span className="font-semibold text-slate-800">{location}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/60 pb-2">
                  <span className="text-slate-500">Stored At:</span>
                  <span className="font-bold text-blue-900">{storedAt}</span>
                </div>
                <div>
                  <span className="text-slate-500 block mb-1">Description:</span>
                  <p className="text-slate-700 bg-white p-2.5 rounded-lg border border-slate-200 text-xs leading-relaxed">{description}</p>
                </div>
              </div>
            </div>
          )}

          {/* Wizard Controller Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            {step > 1 ? (
              <button type="button" onClick={handlePrev} className="btn-secondary text-sm">
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>
            ) : <div />}

            {step < 4 ? (
              <button type="button" onClick={handleNext} className="btn-found text-sm shadow-sm">
                Next Step <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="btn-found text-sm shadow-md font-semibold px-6"
              >
                {loading ? 'Submitting...' : 'Submit Found Report'}
              </button>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
