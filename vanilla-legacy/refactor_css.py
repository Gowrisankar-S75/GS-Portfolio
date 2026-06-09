import re

with open('style.css', 'r') as f:
    content = f.read()

# Replace hardcoded values with variables
replacements = [
    (r'rgba\(5,\s*5,\s*5,\s*0\.5\)', 'var(--bg-tertiary)'),
    (r'#050505', 'var(--bg-secondary)'),
    (r'rgba\(255,\s*255,\s*255,\s*0\.05\)', 'var(--border-color)'),
    (r'rgba\(255,\s*255,\s*255,\s*0\.1\)', 'var(--border-color-strong)'),
    (r'rgba\(255,\s*255,\s*255,\s*0\.02\)', 'var(--card-bg)'),
    (r'rgba\(255,\s*255,\s*255,\s*0\.04\)', 'var(--card-bg-hover)'),
    (r'rgba\(255,\s*255,\s*255,\s*0\.2\)', 'var(--border-color-stronger)'),
    (r'rgba\(0,\s*0,\s*0,\s*0\.3\)', 'var(--input-bg)'),
    (r'rgba\(0,\s*0,\s*0,\s*0\.2\)', 'var(--input-bg-light)'),
    (r'rgba\(10,\s*10,\s*10,\s*0\.8\)', 'var(--bg-gradient-end)'),
    (r'rgba\(0,\s*0,\s*0,\s*0\.5\)', 'var(--shadow-color)'),
]

for old, new in replacements:
    content = re.sub(old, new, content)

# Add new CSS variables at the top
root_vars = """
:root {
    --bg-color: #0a0a0a;
    --bg-secondary: #050505;
    --bg-tertiary: rgba(5, 5, 5, 0.5);
    --text-primary: #ffffff;
    --text-secondary: #a0a0a0;
    --accent-color: #6366f1;
    --accent-glow: rgba(99, 102, 241, 0.5);
    --nav-bg: rgba(10, 10, 10, 0.8);
    --card-bg: rgba(255, 255, 255, 0.02);
    --card-bg-hover: rgba(255, 255, 255, 0.04);
    --border-color: rgba(255, 255, 255, 0.05);
    --border-color-strong: rgba(255, 255, 255, 0.1);
    --border-color-stronger: rgba(255, 255, 255, 0.2);
    --input-bg: rgba(0, 0, 0, 0.3);
    --input-bg-light: rgba(0, 0, 0, 0.2);
    --bg-gradient-end: rgba(10, 10, 10, 0.8);
    --shadow-color: rgba(0, 0, 0, 0.5);
}

[data-theme="light"] {
    --bg-color: #f8fafc;
    --bg-secondary: #ffffff;
    --bg-tertiary: #f1f5f9;
    --text-primary: #0f172a;
    --text-secondary: #475569;
    --accent-color: #4f46e5;
    --accent-glow: rgba(79, 70, 229, 0.3);
    --nav-bg: rgba(255, 255, 255, 0.9);
    --card-bg: #ffffff;
    --card-bg-hover: #f8fafc;
    --border-color: #e2e8f0;
    --border-color-strong: #cbd5e1;
    --border-color-stronger: #94a3b8;
    --input-bg: #ffffff;
    --input-bg-light: #f1f5f9;
    --bg-gradient-end: rgba(255, 255, 255, 0.8);
    --shadow-color: rgba(0, 0, 0, 0.1);
}

.theme-btn {
    background: transparent;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
}
.theme-btn:hover {
    transform: scale(1.1);
}
"""

# Replace the original :root with the new one
content = re.sub(r':root\s*\{[^}]*\}', root_vars, content, count=1)

with open('style.css', 'w') as f:
    f.write(content)

print("CSS refactored successfully.")
