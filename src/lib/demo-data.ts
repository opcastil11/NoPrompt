import { DemoPrompt } from '@/types';

export const DEMO_PROMPTS: DemoPrompt[] = [
  {
    id: 'quantum',
    prompt: 'Explain quantum computing in simple terms',
    category: 'Science',
    responses: {
      bet: {
        hash: 'BET:7f3a...c9d1',
        response: 'Quantum computing uses quantum bits (qubits) that can exist in multiple states simultaneously, unlike classical bits that are either 0 or 1. This property, called superposition, along with entanglement, allows quantum computers to process certain types of problems exponentially faster than classical computers.',
        similarity: 0.94,
        tokens: 1,
      },
      'soft-prompts': {
        hash: 'SPT:a2e8...4f17',
        response: 'Quantum computing harnesses quantum mechanical phenomena — superposition and entanglement — to perform computations. Where classical computers use bits (0 or 1), quantum computers use qubits that can be both simultaneously, enabling parallel processing of complex problems.',
        similarity: 0.96,
        tokens: 8,
      },
      lsh: {
        hash: 'LSH:d491...b3e2',
        response: 'Quantum computers work differently from regular computers. They use quantum bits that can be in multiple states at once, making them powerful for specific tasks like cryptography and optimization.',
        similarity: 0.82,
        tokens: 1,
      },
      'gist-tokens': {
        hash: 'GST:c7f2...91a4',
        response: 'Quantum computing leverages quantum mechanics for computation. Qubits, unlike classical bits, use superposition to represent 0 and 1 simultaneously. Combined with entanglement, this enables solving certain problems exponentially faster.',
        similarity: 0.91,
        tokens: 4,
      },
      adversarial: {
        hash: 'ADV:8b1d...e5f3',
        response: 'Quantum computing exploits quantum mechanical effects for information processing. Superposition allows qubits to hold multiple values; entanglement creates correlations between qubits. These properties enable quantum speedups for specific problem classes.',
        similarity: 0.87,
        tokens: 12,
      },
      'soft-prompt-optimization': {
        hash: 'SPO:f4c9...2d8a',
        response: 'Quantum computing uses the principles of quantum mechanics to process information. Qubits can exist in superposition (both 0 and 1), and entangled qubits can be correlated across distances. This enables quantum algorithms to solve certain problems much faster than classical approaches.',
        similarity: 0.95,
        tokens: 6,
      },
      gcg: {
        hash: 'GCG:3e7a...d1b5',
        response: 'Quantum computing is a type of computation that uses quantum-mechanical phenomena like superposition and entanglement. Quantum bits (qubits) can process multiple possibilities simultaneously, offering speedups for optimization, cryptography, and simulation tasks.',
        similarity: 0.88,
        tokens: 15,
      },
    },
  },
  {
    id: 'sorting',
    prompt: 'Write a Python function to sort a list',
    category: 'Programming',
    responses: {
      bet: {
        hash: 'BET:2d9f...a7b3',
        response: '```python\ndef sort_list(lst):\n    if len(lst) <= 1:\n        return lst\n    pivot = lst[len(lst) // 2]\n    left = [x for x in lst if x < pivot]\n    middle = [x for x in lst if x == pivot]\n    right = [x for x in lst if x > pivot]\n    return sort_list(left) + middle + sort_list(right)\n```',
        similarity: 0.93,
        tokens: 1,
      },
      'soft-prompts': {
        hash: 'SPT:e5b1...8c4d',
        response: '```python\ndef sort_list(arr):\n    """Sort a list using quicksort algorithm."""\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[0]\n    less = [x for x in arr[1:] if x <= pivot]\n    greater = [x for x in arr[1:] if x > pivot]\n    return sort_list(less) + [pivot] + sort_list(greater)\n```',
        similarity: 0.95,
        tokens: 8,
      },
      lsh: {
        hash: 'LSH:b8c3...f291',
        response: '```python\ndef sort_list(lst):\n    return sorted(lst)\n```\nPython\'s built-in `sorted()` uses Timsort, an efficient hybrid sorting algorithm.',
        similarity: 0.78,
        tokens: 1,
      },
      'gist-tokens': {
        hash: 'GST:4a7e...d5c8',
        response: '```python\ndef sort_list(data):\n    n = len(data)\n    for i in range(n):\n        for j in range(0, n - i - 1):\n            if data[j] > data[j + 1]:\n                data[j], data[j + 1] = data[j + 1], data[j]\n    return data\n```',
        similarity: 0.89,
        tokens: 4,
      },
      adversarial: {
        hash: 'ADV:c2f8...7e4a',
        response: '```python\ndef sort_list(items):\n    if not items:\n        return []\n    mid = len(items) // 2\n    left = sort_list(items[:mid])\n    right = sort_list(items[mid:])\n    return merge(left, right)\n\ndef merge(a, b):\n    result = []\n    i = j = 0\n    while i < len(a) and j < len(b):\n        if a[i] <= b[j]:\n            result.append(a[i]); i += 1\n        else:\n            result.append(b[j]); j += 1\n    return result + a[i:] + b[j:]\n```',
        similarity: 0.85,
        tokens: 12,
      },
      'soft-prompt-optimization': {
        hash: 'SPO:9d3a...b1e7',
        response: '```python\ndef sort_list(lst):\n    """Quicksort implementation."""\n    if len(lst) <= 1:\n        return lst\n    pivot = lst[len(lst) // 2]\n    left = [x for x in lst if x < pivot]\n    mid = [x for x in lst if x == pivot]\n    right = [x for x in lst if x > pivot]\n    return sort_list(left) + mid + sort_list(right)\n```',
        similarity: 0.97,
        tokens: 6,
      },
      gcg: {
        hash: 'GCG:7b5e...3f9c',
        response: '```python\ndef sort_list(arr):\n    for i in range(1, len(arr)):\n        key = arr[i]\n        j = i - 1\n        while j >= 0 and arr[j] > key:\n            arr[j + 1] = arr[j]\n            j -= 1\n        arr[j + 1] = key\n    return arr\n```',
        similarity: 0.86,
        tokens: 15,
      },
    },
  },
  {
    id: 'photosynthesis',
    prompt: 'What is photosynthesis and why is it important?',
    category: 'Science',
    responses: {
      bet: {
        hash: 'BET:5c8d...e2a7',
        response: 'Photosynthesis is the process by which plants convert sunlight, water, and carbon dioxide into glucose and oxygen. It is fundamental to life on Earth — it produces the oxygen we breathe, forms the base of most food chains, and is a key component of the global carbon cycle.',
        similarity: 0.95,
        tokens: 1,
      },
      'soft-prompts': {
        hash: 'SPT:b3f1...7d9e',
        response: 'Photosynthesis is a biochemical process where plants, algae, and cyanobacteria use light energy to convert CO₂ and H₂O into glucose (C₆H₁₂O₆) and O₂. Its importance: produces atmospheric oxygen, is the primary energy input for ecosystems, and regulates atmospheric carbon levels.',
        similarity: 0.97,
        tokens: 8,
      },
      lsh: {
        hash: 'LSH:9e4a...c1d8',
        response: 'Photosynthesis converts sunlight into food for plants. It produces oxygen as a byproduct, which is essential for animal life. Without it, life as we know it would not exist.',
        similarity: 0.80,
        tokens: 1,
      },
      'gist-tokens': {
        hash: 'GST:d7b2...a4f6',
        response: 'Photosynthesis: plants use light to make glucose from CO₂ and water, releasing O₂. Critical because it produces oxygen, sustains food chains, and regulates climate through carbon fixation.',
        similarity: 0.92,
        tokens: 4,
      },
      adversarial: {
        hash: 'ADV:a1e9...8c3b',
        response: 'Photosynthesis is the conversion of light energy to chemical energy by organisms. Green plants absorb sunlight via chlorophyll, combining water and carbon dioxide to produce sugars and molecular oxygen. It sustains virtually all life on Earth.',
        similarity: 0.88,
        tokens: 12,
      },
      'soft-prompt-optimization': {
        hash: 'SPO:6f2d...b8e1',
        response: 'Photosynthesis is the process by which photosynthetic organisms convert light energy into chemical energy stored in glucose. Using water and CO₂ as inputs, it produces oxygen and sugars. It is vital as the foundation of nearly all food webs and the primary source of atmospheric oxygen.',
        similarity: 0.96,
        tokens: 6,
      },
      gcg: {
        hash: 'GCG:e8c4...5a2f',
        response: 'Photosynthesis is how plants make their own food using sunlight. The process takes in carbon dioxide and water, producing glucose and oxygen. It is important because it provides food energy for ecosystems and generates the oxygen in our atmosphere.',
        similarity: 0.84,
        tokens: 15,
      },
    },
  },
  {
    id: 'ml',
    prompt: 'Explain the difference between machine learning and deep learning',
    category: 'Technology',
    responses: {
      bet: {
        hash: 'BET:a4f7...3e8c',
        response: 'Machine learning is a broad field where algorithms learn patterns from data to make predictions. Deep learning is a subset of ML that uses neural networks with many layers (hence "deep") to automatically learn hierarchical features. ML may need manual feature engineering; deep learning learns features automatically but requires more data and compute.',
        similarity: 0.93,
        tokens: 1,
      },
      'soft-prompts': {
        hash: 'SPT:d2c9...f1b5',
        response: 'Machine learning encompasses algorithms that improve through experience — including decision trees, SVMs, and neural networks. Deep learning specifically refers to multi-layer neural networks that learn hierarchical representations. Key difference: ML often requires feature engineering, while DL learns features end-to-end from raw data.',
        similarity: 0.96,
        tokens: 8,
      },
      lsh: {
        hash: 'LSH:7f3e...a8d2',
        response: 'Machine learning: algorithms that learn from data. Deep learning: a type of ML using multi-layered neural networks. Deep learning needs more data but can learn features automatically.',
        similarity: 0.79,
        tokens: 1,
      },
      'gist-tokens': {
        hash: 'GST:e9a1...c4d7',
        response: 'ML: broad field, algorithms learn patterns from data (trees, SVMs, NNs). DL: subset using deep neural networks, auto-learns hierarchical features. DL needs more data/compute but less feature engineering.',
        similarity: 0.90,
        tokens: 4,
      },
      adversarial: {
        hash: 'ADV:b5d3...9f1e',
        response: 'Machine learning is the science of training algorithms on data. Deep learning uses neural networks with multiple hidden layers to learn complex patterns. While all deep learning is machine learning, not all ML is deep learning — simpler methods like regression and decision trees are ML but not DL.',
        similarity: 0.86,
        tokens: 12,
      },
      'soft-prompt-optimization': {
        hash: 'SPO:c1e8...7a4d',
        response: 'Machine learning (ML) is the broader field of algorithms learning from data. Deep learning (DL) is a specialized subset using deep neural networks with multiple layers. ML techniques include linear regression, decision trees, SVMs; DL uses architectures like CNNs, RNNs, Transformers. DL automates feature extraction but requires significantly more data.',
        similarity: 0.95,
        tokens: 6,
      },
      gcg: {
        hash: 'GCG:4a9c...e2f8',
        response: 'Machine learning covers many approaches to learning from data. Deep learning focuses on neural networks with many layers that can learn complex hierarchical representations directly from raw inputs, making it especially effective for images, text, and audio.',
        similarity: 0.85,
        tokens: 15,
      },
    },
  },
  {
    id: 'recipe',
    prompt: 'Give me a simple recipe for pasta carbonara',
    category: 'Cooking',
    responses: {
      bet: {
        hash: 'BET:f1d6...8b2a',
        response: 'Pasta Carbonara:\n\n1. Cook 400g spaghetti in salted water until al dente\n2. Fry 200g guanciale/pancetta until crispy\n3. Whisk 4 egg yolks + 1 whole egg with 100g Pecorino Romano\n4. Drain pasta, toss with guanciale (off heat)\n5. Add egg mixture, toss quickly — residual heat cooks eggs\n6. Season with black pepper, serve immediately',
        similarity: 0.94,
        tokens: 1,
      },
      'soft-prompts': {
        hash: 'SPT:8e4b...c7a3',
        response: 'Classic Carbonara:\n\nIngredients: 400g spaghetti, 200g guanciale, 4 egg yolks, 1 whole egg, 100g Pecorino Romano, black pepper.\n\nMethod: Cook pasta al dente. Crisp guanciale in pan. Mix eggs and cheese. Combine hot pasta with guanciale off heat. Stir in egg-cheese mixture quickly. The heat of pasta cooks the eggs into a creamy sauce. Serve with extra pepper and cheese.',
        similarity: 0.96,
        tokens: 8,
      },
      lsh: {
        hash: 'LSH:c5a9...d4f1',
        response: 'Carbonara: Cook spaghetti. Fry bacon bits until crispy. Mix egg yolks with parmesan. Combine all off heat. Season with pepper.',
        similarity: 0.77,
        tokens: 1,
      },
      'gist-tokens': {
        hash: 'GST:a8d3...f2e7',
        response: 'Carbonara: Cook spaghetti al dente. Crisp guanciale. Whisk yolks + Pecorino. Toss hot pasta with meat (off heat), then add egg mixture. Heat coats eggs into cream. Black pepper to finish.',
        similarity: 0.91,
        tokens: 4,
      },
      adversarial: {
        hash: 'ADV:d7f2...a9c4',
        response: 'Pasta Carbonara Recipe:\n- Boil spaghetti in salted water\n- Render guanciale until golden\n- Beat eggs with grated Pecorino\n- Off heat: combine pasta, guanciale, egg mixture\n- Toss vigorously, add pasta water if needed\n- Finish with cracked black pepper',
        similarity: 0.87,
        tokens: 12,
      },
      'soft-prompt-optimization': {
        hash: 'SPO:e3b8...5c1d',
        response: 'Pasta Carbonara (Serves 4):\n\n1. Boil 400g spaghetti until al dente, reserve 1 cup pasta water\n2. Dice 200g guanciale, cook in pan until crispy and rendered\n3. Whisk 4 egg yolks + 1 egg with 100g grated Pecorino Romano\n4. Drain pasta, add to guanciale pan OFF heat\n5. Pour egg mixture over, toss vigorously — pasta heat makes the sauce\n6. Add pasta water as needed for silkiness, finish with black pepper',
        similarity: 0.96,
        tokens: 6,
      },
      gcg: {
        hash: 'GCG:9c1f...b4e7',
        response: 'Simple Carbonara: Cook spaghetti. Fry guanciale or pancetta. Mix egg yolks with Pecorino cheese. Take pan off heat, add drained pasta and guanciale, then quickly stir in egg mixture. Season with black pepper.',
        similarity: 0.84,
        tokens: 15,
      },
    },
  },
];

export const QUICK_PROMPTS = [
  'Explain quantum computing in simple terms',
  'Write a Python function to sort a list',
  'What is photosynthesis and why is it important?',
  'Explain the difference between machine learning and deep learning',
  'Give me a simple recipe for pasta carbonara',
];

// Keyword matching for custom prompts
export function findBestMatch(input: string): DemoPrompt | null {
  const normalizedInput = input.toLowerCase().trim();

  // Direct match
  const direct = DEMO_PROMPTS.find(
    (p) => p.prompt.toLowerCase() === normalizedInput
  );
  if (direct) return direct;

  // Keyword match
  const keywords: Record<string, string> = {
    quantum: 'quantum',
    sort: 'sorting',
    sorting: 'sorting',
    python: 'sorting',
    function: 'sorting',
    photosynthesis: 'photosynthesis',
    plant: 'photosynthesis',
    machine: 'ml',
    'deep learning': 'ml',
    neural: 'ml',
    pasta: 'recipe',
    carbonara: 'recipe',
    recipe: 'recipe',
    cook: 'recipe',
  };

  for (const [keyword, id] of Object.entries(keywords)) {
    if (normalizedInput.includes(keyword)) {
      return DEMO_PROMPTS.find((p) => p.id === id) || null;
    }
  }

  return null;
}
