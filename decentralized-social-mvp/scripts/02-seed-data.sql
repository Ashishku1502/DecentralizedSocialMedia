-- Insert sample users
INSERT INTO users (wallet_address, username, bio, profile_pic_url) VALUES
('0x1234567890123456789012345678901234567890', 'alice_crypto', 'Blockchain enthusiast and DeFi explorer 🚀', 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice'),
('0x2345678901234567890123456789012345678901', 'bob_web3', 'Building the decentralized future, one block at a time', 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob'),
('0x3456789012345678901234567890123456789012', 'charlie_dao', 'DAO governance and community building advocate', 'https://api.dicebear.com/7.x/avataaars/svg?seed=charlie')
ON CONFLICT (wallet_address) DO NOTHING;

-- Insert sample posts
INSERT INTO posts (wallet_address, content) VALUES
('0x1234567890123456789012345678901234567890', 'Just connected my wallet to this amazing decentralized social platform! The future is here 🌟'),
('0x2345678901234567890123456789012345678901', 'Love how my identity is tied to my wallet address. True ownership of digital identity! 💪'),
('0x3456789012345678901234567890123456789012', 'Decentralized social media means no more censorship and data exploitation. This is revolutionary! 🔥'),
('0x1234567890123456789012345678901234567890', 'Building on Ethereum feels like magic. Every transaction is transparent and immutable ✨'),
('0x2345678901234567890123456789012345678901', 'Web3 social platforms will change how we interact online forever. Excited to be part of this journey! 🚀')
ON CONFLICT DO NOTHING;

-- Insert sample likes
INSERT INTO likes (post_id, wallet_address) VALUES
(1, '0x2345678901234567890123456789012345678901'),
(1, '0x3456789012345678901234567890123456789012'),
(2, '0x1234567890123456789012345678901234567890'),
(2, '0x3456789012345678901234567890123456789012'),
(3, '0x1234567890123456789012345678901234567890'),
(3, '0x2345678901234567890123456789012345678901')
ON CONFLICT DO NOTHING;

-- Insert sample comments
INSERT INTO comments (post_id, wallet_address, content) VALUES
(1, '0x2345678901234567890123456789012345678901', 'Welcome to the decentralized future! 🎉'),
(1, '0x3456789012345678901234567890123456789012', 'This platform is going to change everything!'),
(2, '0x1234567890123456789012345678901234567890', 'Exactly! True digital ownership is the key 🔑'),
(3, '0x2345678901234567890123456789012345678901', 'No more platform lock-in. We own our data now! 💯')
ON CONFLICT DO NOTHING;
