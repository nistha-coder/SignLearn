import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { Search } from 'lucide-react';
import Layout from '../layout/Layout';
import { alphabetSigns } from '../../data/alphabetSigns';
import { wordSigns } from '../../data/wordSigns';
import { AlphabetSign, WordSign } from '../../types';

type DictionaryItem = AlphabetSign | WordSign;

const Dictionary: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<DictionaryItem | null>(null);
  const [dictionaryItems, setDictionaryItems] = useState<DictionaryItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<DictionaryItem[]>([]);

  useEffect(() => {
    const allItems: DictionaryItem[] = [
      ...alphabetSigns,
      ...wordSigns,
    ];
    setDictionaryItems(allItems);
    setFilteredItems(allItems);
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredItems(dictionaryItems);
      return;
    }

    const term = searchTerm.toLowerCase();
    const filtered = dictionaryItems.filter(item => {
      if ('letter' in item) {
        return item.letter.toLowerCase().includes(term) ||
               item.name.toLowerCase().includes(term);
      } else {
        return item.word.toLowerCase().includes(term);
      }
    });

    setFilteredItems(filtered);
  }, [searchTerm, dictionaryItems]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleItemClick = (item: DictionaryItem) => {
    setSelectedItem(item);
  };

  const getItemLabel = (item: DictionaryItem): string => {
    if ('letter' in item) {
      return `${item.letter} - ${item.name}`;
    } else {
      return item.word;
    }
  };

  const commonWords = wordSigns.slice(0, 10);

  return (
    <Layout>
      <div className="page-content">
        <div className="container-custom">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold mb-3">Sign Language Dictionary📖</h1>
            <p className="text-gray-300">
              Look up signs for alphabets and common words
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <div className="bg-bg-medium p-4 rounded-xl border border-gray-700 mb-6">
                  <div className="relative mb-4">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={handleSearch}
                      placeholder="Search signs..."
                      className="input-field pl-10"
                    />
                    <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>

                  <div className="max-h-[500px] overflow-y-auto pr-2 scrollbar-hide">
                    {filteredItems.length > 0 ? (
                      <div className="space-y-2">
                        {filteredItems.map((item, index) => (
                          <div
                            key={index}
                            onClick={() => handleItemClick(item)}
                            className={`p-3 rounded-lg cursor-pointer transition-colors ${
                              selectedItem === item 
                                ? 'bg-primary bg-opacity-20 border border-primary' 
                                : 'bg-bg-light hover:bg-bg-light hover:bg-opacity-70'
                            }`}
                          >
                            <div className="font-medium">
                              {getItemLabel(item)}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-6 text-gray-400">
                        No signs found matching "{searchTerm}"
                      </div>
                    )}
                  </div>
                </div>

                <div className="hidden lg:block">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/dashboard')}
                    className="w-full"
                  >
                    Back to Dashboard
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-2">
                {selectedItem ? (
                  <div className="bg-bg-medium p-6 rounded-xl border border-gray-700 mb-6">
                    <div className="mb-6">
                      {'letter' in selectedItem ? (
                        <div className="flex items-center mb-4">
                          <div className="w-16 h-16 flex items-center justify-center bg-primary bg-opacity-20 rounded-full mr-4">
                            <span className="text-3xl font-bold text-primary">{selectedItem.letter}</span>
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold">Letter {selectedItem.letter}</h2>
                            <p className="text-gray-300">{selectedItem.name}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="mb-4">
                          <h2 className="text-2xl font-bold mb-2">{selectedItem.word}</h2>
                          {selectedItem.meaning && (
                            <p className="text-gray-300">{selectedItem.meaning}</p>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex justify-center mb-6">
                      <div className="w-full max-w-md h-64 rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center">
                        <video 
                          src={selectedItem.gifUrl}
                          className="h-full object-contain"
                          controls
                          autoPlay
                          loop
                          muted
                        />
                      </div>
                    </div>

                    {'letter' in selectedItem && (
                      <div>
                        <h3 className="text-lg font-semibold mb-2">How to Sign:</h3>
                        <p className="text-gray-300">
                          Follow the demonstration in the video to form the sign for letter {selectedItem.letter}.
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-bg-medium p-6 rounded-xl border border-gray-700 mb-6 flex flex-col items-center justify-center min-h-[300px]">
                    <div className="text-center">
                      <h2 className="text-xl font-semibold mb-4">Select a sign to view</h2>
                      <p className="text-gray-400">
                        Choose from the list or search for a specific sign
                      </p>
                    </div>
                  </div>
                )}

                <div>
                  <h2 className="text-xl font-semibold mb-4">Common Words</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {commonWords.map((word, index) => (
                      <Card
                        key={index}
                        animate={true}
                        onClick={() => handleItemClick(word)}
                        className={`p-3 text-center ${
                          selectedItem === word 
                            ? 'border-primary'
                            : 'border-gray-700'
                        }`}
                      >
                        <span className="font-medium">{word.word}</span>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="mt-6 lg:hidden">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/dashboard')}
                    className="w-full"
                  >
                    Back to Dashboard
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dictionary;
