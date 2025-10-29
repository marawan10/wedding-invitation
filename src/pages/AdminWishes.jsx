import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getAllWishes } from '@/lib/api';
import { CheckCircle, XCircle, Loader2, Download } from 'lucide-react';

export default function AdminWishes() {
  const [allWishes, setAllWishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAllWishes();
  }, []);

  const loadAllWishes = async () => {
    try {
      setLoading(true);
      setError(null);
      const wishes = await getAllWishes();
      setAllWishes(wishes);
    } catch (err) {
      setError('Failed to load messages. Please try again later.');
      console.error('Error loading all wishes:', err);
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = () => {
    // Create CSV header
    let csvContent = 'Name,Message,Attending,Date\n';
    
    // Add each wish as a row
    allWishes.forEach(wish => {
      const row = [
        `"${wish.name}"`,
        `"${wish.message.replace(/"/g, '""')}"`,
        `"${wish.attending}"`,
        `"${new Date(wish.timestamp).toLocaleString()}"`
      ].join(',');
      csvContent += row + '\n';
    });

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'wedding_wishes.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">جميع الرسائل</h1>
          <p className="text-gray-600">عرض كل الرسائل المرسلة من الضيوف</p>
          
          <button
            onClick={downloadCSV}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
          >
            <Download className="ml-2 h-4 w-4" />
            تحميل كملف CSV
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <XCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
            <span className="text-gray-600 mr-2">جاري التحميل...</span>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <ul className="divide-y divide-gray-200">
              {allWishes.length > 0 ? (
                allWishes.map((wish) => (
                  <li key={wish.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{wish.name}</div>
                          <div className="text-sm text-gray-500">
                            {new Date(wish.timestamp).toLocaleString()}
                            <span className="mx-2">•</span>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              wish.attending === 'attending' 
                                ? 'bg-green-100 text-green-800' 
                                : wish.attending === 'not-attending'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {wish.attending === 'attending' 
                                ? 'سأحضر' 
                                : wish.attending === 'not-attending'
                                ? 'لن أحضر'
                                : 'ربما'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        {wish.message}
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="px-6 py-10 text-center">
                  <div className="text-gray-500">لا توجد رسائل متاحة</div>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
